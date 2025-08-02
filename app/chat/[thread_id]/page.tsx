'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useChat } from '@/api/chat/chatApi';
import deleteConversation from '@/api/chat/deleteConversation';
import { Menu } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer, GraphLinkFilter, GraphNodeFilter } from '@/types/Graph';
import { useViewportHeight } from '@/hooks/use-viewport-height';
import ChatBox from '@/components/Chat/ChatBox';
import ChatGraphModal from '@/components/Chat/ChatGraphModal';
import ChatLeftPanel from '@/components/Chat/ChatLeftPanel';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightPanel from '@/components/Chat/ChatRightPanel';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import ChatTextArea from '@/components/Chat/ChatTextArea';

export default function ChatPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { socket, conversations, setConversations } = useChatContext();
    useViewportHeight();
    const {
        messages,
        isThinking,
        status,
        sendMessage,
        currentResponseContent,
        copyToClipboard,
        copiedMessageId,
        currentGraphData,
    } = useChat({
        websocket: socket,
        setConversations,
    });

    const [graphView, setGraphView] = useState<string>('2d');
    const [isOpenLeftSheet, setIsOpenLeftSheet] = useState<boolean>(false);
    const [isOpenRightSheet, setIsOpenRightSheet] = useState<boolean>(false);
    const [isOpenGraphModal, setIsOpenGraphModal] = useState<boolean>(false);
    const [currentMessage, setCurrentMessage] = useState<any>();
    const [activeLeftTab, setActiveLeftTab] = useState<string>('chats');

    const [graphLayers, setGraphLayers] = useState<GraphLayer[]>([
        { id: 'all_retrieved_nodes', name: 'All Retrieved Nodes', enabled: true, color: '#d3d3d3', priority: 1 },
        {
            id: 'all_retrieved_nodes_with_neighbors',
            name: 'With Neighbors',
            enabled: true,
            color: '#3b82f6',
            priority: 2,
        },
        { id: 'relevant_retrieved_nodes', name: 'Relevant Nodes', enabled: true, color: '#10b981', priority: 3 },
        { id: 'relevant_context', name: 'Relevant Context', enabled: true, color: '#ef4444', priority: 4 },
    ]);
    const [graphLinkFilters, setGraphLinkFilters] = useState<GraphLinkFilter[]>([]);
    const [graphNodeFilters, setGraphNodeFilters] = useState<GraphNodeFilter[]>([]);
    const [cardData, setCardData] = useState<CardData>({ nodes: [], links: [] });
    const [input, setInput] = useState<string>('');
    const [activeMsgType, setActiveMsgType] = useState<string | null>('semantic_graph');

    useEffect(() => {
        if (!!currentGraphData) {
            setCurrentMessage(currentGraphData);
            return;
        }

        const message = [...messages].reverse().find(({ direction }) => direction === 'incoming');
        setCurrentMessage(message);
    }, [messages, currentGraphData]);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
    };

    const onRenameConversation = (threadId: string, newTitle: string) => {
        setConversations((prev) =>
            prev.map((c) => (c.thread_id === threadId ? { ...c, title: newTitle } : c))
        );
    };

    const toggleMsgType = (type: string) => {
        setActiveMsgType((prev) => (prev === type ? null : type));
    };

    if (!socket) return null;

    return (
        <div className="flex flex-col h-[calc(100*var(--vh,1vh))] w-full max-h-[calc(100*var(--vh,1vh))]">
            <ChatGraphModal
                open={isOpenGraphModal}
                onOpenChange={setIsOpenGraphModal}
                graphLinkFilters={graphLinkFilters}
                setGraphLinkFilters={setGraphLinkFilters}
                graphNodeFilters={graphNodeFilters}
                setGraphNodeFilters={setGraphNodeFilters}
                graphView={graphView}
                setGraphView={setGraphView}
                graphLayers={graphLayers}
                setGraphLayers={setGraphLayers}
                data={currentMessage}
                handleCardData={setCardData}
                cardData={cardData}
            />
            <header className="w-full flex md:hidden items-center justify-between pt-2 px-2 pb-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
                <Menu className="size-6" onClick={() => setIsOpenLeftSheet((prevState) => !prevState)} />
                <Menu className="size-6" onClick={() => setIsOpenRightSheet((prevState) => !prevState)} />
            </header>
            <ChatLeftSheet
                isOpen={isOpenLeftSheet}
                handleOpen={setIsOpenLeftSheet}
                conversations={conversations}
                handleDeleteConversation={onDeleteConversation}
                onRenameConversation={onRenameConversation}
                activeLeftTab={activeLeftTab}
                setActiveLeftTab={setActiveLeftTab}
            />
            <ChatRightSheet
                isOpen={isOpenRightSheet}
                handleOpen={setIsOpenRightSheet}
                graphLinkFilters={graphLinkFilters}
                setGraphLinkFilters={setGraphLinkFilters}
                graphNodeFilters={graphNodeFilters}
                setGraphNodeFilters={setGraphNodeFilters}
                graphView={graphView}
                setGraphView={setGraphView}
                graphLayers={graphLayers}
                setGraphLayers={setGraphLayers}
                setIsOpenGraphModal={setIsOpenGraphModal}
                currentMessage={currentMessage}
                cardData={cardData}
                handleCardData={setCardData}
            />
            <main className="flex flex-1 overflow-hidden pb-2 z-40 md:pt-0 pt-2 min-h-0 relative">
                <ChatLeftPanel
                    conversations={conversations}
                    onDeleteConversation={onDeleteConversation}
                    onRenameConversation={onRenameConversation}
                    activeLeftTab={activeLeftTab}
                    setActiveLeftTab={setActiveLeftTab}
                />

                <section className="flex-1 flex flex-col overflow-hidden min-h-0">
                    <div className="flex-1 overflow-y-auto min-h-0">
                        <ChatBox
                            messages={messages}
                            isThinking={isThinking}
                            status={status}
                            currentResponseContent={currentResponseContent}
                            copiedMessageId={copiedMessageId}
                            sendMessage={sendMessage}
                            copyToClipboard={copyToClipboard}
                            handleCurrentMessage={setCurrentMessage}
                        />
                    </div>
                </section>

                <ChatRightPanel
                    currentMessage={currentMessage}
                    graphLayers={graphLayers}
                    setGraphLayers={setGraphLayers}
                    graphLinkFilters={graphLinkFilters}
                    setGraphLinkFilters={setGraphLinkFilters}
                    graphNodeFilters={graphNodeFilters}
                    setGraphNodeFilters={setGraphNodeFilters}
                    graphView={graphView}
                    setGraphView={setGraphView}
                    cardData={cardData}
                    handleCardData={setCardData}
                    setIsOpenGraphModal={setIsOpenGraphModal}
                />
            </main>

            {/* Fixed chat input for mobile */}
            <div className="md:hidden chat-input-container">
                <ChatTextArea
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    activeMsgType={activeMsgType}
                    toggleMsgType={toggleMsgType}
                />
            </div>

        </div>
    );
}
