import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import eventHandler from '@/api/chat/eventHandler';
import { getConversationSnapshot } from '@/api/chat/getConversationSnapshot';
import renderMessageMd from '@/utils/renderMessageMd';
import { v4 as uuidv4 } from 'uuid';
import { Conversation } from '@/types/Conversation';
import { GraphData } from '@/types/Graph';
import { Message } from '@/types/Message';
import { MessageTypes } from '@/types/MessageTypes';
import { EvaluatorRun } from '@/types/EvaluatorRun';
import { useAnalytics } from '@/hooks/use-analytics';

interface UseChatArgs {
    websocket: WebSocket | null;
    setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>;
    setEvaluatorRun?: React.Dispatch<React.SetStateAction<EvaluatorRun | undefined>>;
}

export const useChat = ({ websocket, setConversations, setEvaluatorRun }: UseChatArgs) => {
    const { trackChatResponse } = useAnalytics();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [currentResponseContent, setCurrentResponseContent] = useState<string>('');
    const currentResponseRef = useRef(currentResponseContent);
    const accumulatedContentRef = useRef('');
    const graphDataRef = useRef<GraphData | null>(null);
    const [currentGraphData, setCurrentGraphData] = useState<GraphData | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const pathname = usePathname();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const responseStartTimeRef = useRef<number>(0);

    const threadId = useMemo(() => {
        if (pathname.startsWith('/chat/')) {
            const match = pathname.match(/^\/chat\/([^\/]+)/);
            return match ? match[1] : null;
        } else if (pathname.startsWith('/evaluator/')) {
            const match = pathname.match(/^\/evaluator\/([^\/]+)/);
            const id = match ? match[1] : null;
            console.log('Extracted evaluator thread ID:', id, 'from pathname:', pathname);
            return id;
        }
        return null;
    }, [pathname]);

    useEffect(() => {
        currentResponseRef.current = currentResponseContent;
    }, [currentResponseContent]);

    useEffect(() => {
        if (currentResponseContent !== '') {
            setCurrentResponseContent('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentResponseContent]);

    useEffect(() => {
        if (!websocket || (!pathname.startsWith('/chat') && !pathname.startsWith("/evaluator"))) return;

        const handleMessage = async (event: MessageEvent) => {
            console.log('WebSocket message received:', event.data);
            const data = JSON.parse(event.data);

            if (data.name === 'update_status') {
                setStatus(data.params.update_status);
            }

            if (
                data.name === 'relevant_retrieved_nodes' ||
                data.name === 'all_retrieved_nodes' ||
                data.name === 'all_retrieved_nodes_with_neighbors' ||
                data.name === 'relevant_context'
            ) {
                const [key] = Object.keys(data.params);

                const keyMap = {
                    relevant_retrieved_nodes: 'relevantRetrievedNodes',
                    all_retrieved_nodes: 'allRetrievedNodes',
                    all_retrieved_nodes_with_neighbors: 'allRetrievedNodesWithNeighbors',
                    relevant_context: 'relevantContext',
                } as any;

                const mappedKey = keyMap[key];

                setCurrentGraphData((prevState) => ({
                    ...prevState || {},
                    [mappedKey]: data.params[key],
                }));

                graphDataRef.current = {
                    ...graphDataRef.current,
                    ...data.params,
                };
            }

            if (data.type === 'event') {
                await eventHandler(data, { setConversations });
            }

            if (data.type === MessageTypes.token) {
                setIsThinking(false);
                
                if (responseStartTimeRef.current === 0) {
                    responseStartTimeRef.current = Date.now();
                }

                setCurrentResponseContent((prev) => {
                    const updated = prev + data.content;
                    accumulatedContentRef.current = updated;
                    return updated;
                });
            }

            if (data.type === MessageTypes.stop) {             
                const html = await renderMessageMd(accumulatedContentRef.current);
                const message: Message = {
                    ...data,
                    html,
                    content: accumulatedContentRef.current,
                    direction: 'incoming',
                    relevantContext: graphDataRef.current?.relevant_context,
                    allRetrievedNodes: graphDataRef.current?.all_retrieved_nodes,
                    allRetrievedNodesWithNeighbors: graphDataRef.current?.all_retrieved_nodes_with_neighbors,
                    relevantRetrievedNodes: graphDataRef.current?.relevant_retrieved_nodes,
                };

                const responseTime = responseStartTimeRef.current > 0 ? Date.now() - responseStartTimeRef.current : 0;
                const hasGraph = !!(graphDataRef.current?.all_retrieved_nodes || graphDataRef.current?.relevant_retrieved_nodes);
                const nodeCount = (graphDataRef.current?.all_retrieved_nodes?.nodes?.length || 0) + 
                                (graphDataRef.current?.relevant_retrieved_nodes?.nodes?.length || 0);
                
                trackChatResponse(
                    threadId || 'unknown',
                    accumulatedContentRef.current.length,
                    responseTime,
                    hasGraph,
                    nodeCount
                );

                setMessages((prev) => [...prev, message]);
                setCurrentResponseContent('');
                accumulatedContentRef.current = '';
                responseStartTimeRef.current = 0;
                
                if (setConversations && threadId !== 'new') {
                    setConversations((prevConversations) =>
                        prevConversations.map((conversation) =>
                            conversation.thread_id === threadId
                                ? { ...conversation, isGenerating: false }
                                : conversation
                        )
                    );
                }
            }

            if (data.name === 'evaluator') {
                console.log('Evaluator message received:', data);
                console.log('Current messages before update:', messages);
                
                if (data.service_message && data.service_message.type === "message") {
                    const message = data.service_message.message
                    const direction = message.role === "ai" ? "incoming" : "outgoing";
                    const html = await renderMessageMd(message.content);

                    const newMessage: Message = {
                        html,
                        id: uuidv4(),
                        content: message.content,
                        direction: direction,
                    };

                    console.log('Adding evaluator message to chat:', newMessage);
                    setMessages((prev) => {
                        const updated = [...prev, newMessage];
                        return updated;
                    });
                }
                
                // Handle evaluator run data
                if (data.service_message && data.service_message.type === "run" && setEvaluatorRun) {
                    console.log('Setting evaluator run:', data.service_message.run);
                    if (data.service_message.run) {
                        setEvaluatorRun(data.service_message.run);
                    } else {
                        console.warn('Empty run data received from WebSocket');
                        setEvaluatorRun(undefined);
                    }
                }
                
                // Handle evaluator error
                if (data.service_message && data.service_message.type === "error") {
                    console.error('Evaluator error received:', data.service_message.error);
                    const errorMessage: Message = {
                        html: `<div class="text-red-500">Error: ${data.service_message.error}</div>`,
                        id: uuidv4(),
                        content: `Error: ${data.service_message.error}`,
                        direction: 'incoming',
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                }
            }
        };

        websocket.onmessage = handleMessage;

        if (threadId !== 'new' && pathname.startsWith('/chat')) {
            getConversationSnapshot(threadId as string).then(setMessages);
        }
        
        // Initialize empty messages for evaluator paths
        if (pathname.startsWith('/evaluator/') && threadId) {
            console.log('Initializing empty messages for evaluator with threadId:', threadId);
            setMessages([]);
        }

        return () => {
            websocket.removeEventListener('message', handleMessage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [websocket, pathname, threadId, setConversations, setEvaluatorRun]);

    const sendMessage = (input: string, isNew: boolean) => {
        if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

        const outgoingMessage: Message = {
            id: uuidv4(),
            content: input,
            html: input,
            direction: 'outgoing',
        };

        setMessages((prev) => [...prev, outgoingMessage]);

        websocket.send(
            JSON.stringify({
                type: 'message',
                content: input,
                is_new: isNew,
                thread_id: threadId,
            }),
        );

        setIsThinking(true);
    };

    const copyToClipboard = (messageId: string, text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        });
    };

    return {
        messages,
        isThinking,
        status,
        currentResponseContent,
        sendMessage,
        copyToClipboard,
        copiedMessageId,
        bottomRef,
        currentGraphData,
    };
};
