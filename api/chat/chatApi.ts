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

interface UseChatArgs {
    websocket: WebSocket | null;
    setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

export const useChat = ({ websocket, setConversations }: UseChatArgs) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [currentResponseContent, setCurrentResponseContent] = useState<string>('');
    const currentResponseRef = useRef(currentResponseContent);
    const accumulatedContentRef = useRef('');
    const graphDataRef = useRef<GraphData | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const pathname = usePathname();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const threadId = useMemo(() => {
        const match = pathname.match(/^\/chat\/([^\/]+)/);
        return match ? match[1] : null;
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
        if (!websocket || !pathname.startsWith('/chat')) return;

        const handleMessage = async (event: MessageEvent) => {
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

                setMessages((prev) => [...prev, message]);
                setCurrentResponseContent('');
                accumulatedContentRef.current = '';
            }
        };

        websocket.onmessage = handleMessage;

        if (threadId !== 'new') {
            getConversationSnapshot(threadId as string).then(setMessages);
        }

        return () => {
            websocket.removeEventListener('message', handleMessage);
        };
    }, [websocket, pathname, threadId, setConversations]);

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
    };
};
