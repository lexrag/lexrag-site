'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useChat } from '@/api/chat/chatApi';
import deleteConversation from '@/api/chat/deleteConversation';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import { useViewportHeight } from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import ChatBox from '@/components/Chat/ChatBox';
import ChatGraphModal from '@/components/Chat/ChatGraphModal';
import ChatLeftPanel from '@/components/Chat/ChatLeftPanel';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightPanel from '@/components/Chat/ChatRightPanel';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import ChatTextArea from '@/components/Chat/ChatTextArea';
import { SidebarMenu } from '@/components/Sidebar/SidebarMenu';

export default function ChatPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { socket, conversations, setConversations } = useChatContext();
    useViewportHeight();
    const { messages, isThinking, status, sendMessage, currentResponseContent, copyToClipboard, copiedMessageId } =
        useChat({
            websocket: socket,
            setConversations,
        });

    const [graphView, setGraphView] = useState<string>('2d');
    const [isOpenLeftSheet, setIsOpenLeftSheet] = useState<boolean>(false);
    const [isOpenRightSheet, setIsOpenRightSheet] = useState<boolean>(false);
    const [isOpenGraphModal, setIsOpenGraphModal] = useState<boolean>(false);
    const [currentMessage, setCurrentMessage] = useState<any>();
    const [activeLeftTab, setActiveLeftTab] = useState<string>('chats');
    const [iconSidebarOpen, setIconSidebarOpen] = useState(false);

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
    const [cardData, setCardData] = useState<CardData>({ nodes: [], links: [] });
    const [input, setInput] = useState<string>('');
    const [activeMsgType, setActiveMsgType] = useState<string | null>('semantic_graph');

    useEffect(() => {
        const message = [...messages].reverse().find(({ direction }) => direction === 'incoming');
        setCurrentMessage(message);
    }, [messages]);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
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
                graphView={graphView}
                graphLayers={graphLayers}
                data={currentMessage}
                handleCardData={setCardData}
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
                activeLeftTab={activeLeftTab}
                setActiveLeftTab={setActiveLeftTab}
            />
            <ChatRightSheet
                isOpen={isOpenRightSheet}
                handleOpen={setIsOpenRightSheet}
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
                <div
                    className={`hidden md:block fixed z-50 top-0 left-0 h-full transition-all duration-300 ${iconSidebarOpen ? 'w-48 bg-background/95 shadow-lg border-r border-border' : 'w-14 bg-background/80 border-r border-border'} group`}
                    style={{ minHeight: '100vh' }}
                >
                    <div className={`flex items-center ${iconSidebarOpen ? 'justify-end' : 'justify-center'} p-2`}>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={iconSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                            onClick={() => setIconSidebarOpen((prev) => !prev)}
                        >
                            {iconSidebarOpen ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                        </Button>
                    </div>
                    <SidebarMenu collapsed={!iconSidebarOpen} />
                </div>

                <div
                    className="hidden md:block"
                    style={{ width: iconSidebarOpen ? 192 : 56, transition: 'width 0.3s' }}
                />

                <ChatLeftPanel
                    conversations={conversations}
                    onDeleteConversation={onDeleteConversation}
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

            <footer className="absolute bottom-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent py-4">
                <div className="w-1/4" />
                <div className="w-1/4 flex justify-start">
                    <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm">
                        <Link href="/company" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                            Company
                        </Link>
                        <Link
                            href={'/terms-and-conditions'}
                            className="text-gray-600 dark:text-gray-300 hover:text-primary"
                        >
                            Legal Docs
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
