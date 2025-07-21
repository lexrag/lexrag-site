'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useChat } from '@/api/chat/chatApi';
import deleteConversation from '@/api/chat/deleteConversation';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { ClockArrowDown, ClockArrowUp, Expand, Fullscreen, Layers, Menu, MessageSquare } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import { useViewportHeight } from '@/hooks/use-viewport-height';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatBox from '@/components/Chat/ChatBox';
import ChatGraphModal from '@/components/Chat/ChatGraphModal';
import ChatLeftPanel from '@/components/Chat/ChatLeftPanel';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightPanel from '@/components/Chat/ChatRightPanel';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import ChatTextArea from '@/components/Chat/ChatTextArea';
import { MegaMenu } from '@/components/Header/MegaMenu';

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
        <div className="flex flex-col h-[calc(100*var(--vh,1vh))] w-full max-h-[calc(100*var(--vh,1vh))] overflow-hidden">
            <ChatGraphModal
                open={isOpenGraphModal}
                onOpenChange={setIsOpenGraphModal}
                graphView={graphView}
                graphLayers={graphLayers}
                data={currentMessage}
                handleCardData={setCardData}
            />
            <header className="absolute top-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent z-50 pt-2 px-3">
                <div className="w-1/4 flex items-center justify-between">
                    <Tabs value={activeLeftTab} onValueChange={setActiveLeftTab}>
                        <TabsList className="w-fit grid grid-cols-3">
                            <TabsTrigger value="chats" className="text-[12px] py-1 px-2">
                                <MessageSquare />
                            </TabsTrigger>
                            <TabsTrigger value="1" className="text-[12px] py-1 px-2">
                                <ClockArrowDown />
                            </TabsTrigger>
                            <TabsTrigger value="2" className="text-[12px] py-1 px-2">
                                <ClockArrowUp />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <MegaMenu isHomePage={pathname === '/'} />
                </div>
                <div className="w-1/4 flex items-center justify-start gap-2">
                    <Tabs value={graphView} onValueChange={setGraphView}>
                        <TabsList className="w-fit grid grid-cols-2">
                            <TabsTrigger value="2d" className="text-[12px] py-1 px-2">
                                2D
                            </TabsTrigger>
                            <TabsTrigger value="3d" className="text-[12px] py-1 px-2">
                                3D
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Layers className="hover:text-primary cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            {graphLayers.map(({ id, enabled, name }) => {
                                const enabledLayersCount = graphLayers.filter((layer) => layer.enabled).length;
                                const isLastEnabled = enabled && enabledLayersCount === 1;

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={id}
                                        checked={enabled}
                                        onSelect={(event) => event.preventDefault()}
                                        onCheckedChange={(checked) => {
                                            if (!checked && isLastEnabled) return;

                                            setGraphLayers((prevLayers) =>
                                                prevLayers.map((layer) =>
                                                    layer.id === id ? { ...layer, enabled: checked } : layer,
                                                ),
                                            );
                                        }}
                                        disabled={isLastEnabled}
                                    >
                                        {name}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Expand className="hover:text-primary cursor-pointer" onClick={() => setIsOpenGraphModal(true)} />
                    <Fullscreen className="hover:text-primary cursor-pointer" onClick={() => zoomToFitGraph()} />
                </div>
            </header>
            <header className="w-full flex md:hidden items-center justify-between pt-2 px-2 pb-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
                <Menu className="size-6" onClick={() => setIsOpenLeftSheet((prevState) => !prevState)} />
                <MegaMenu isHomePage={pathname === '/'} />
                <Menu className="size-6" onClick={() => setIsOpenRightSheet((prevState) => !prevState)} />
            </header>
            <ChatLeftSheet
                isOpen={isOpenLeftSheet}
                handleOpen={setIsOpenLeftSheet}
                conversations={conversations}
                handleDeleteConversation={onDeleteConversation}
                activeTab={activeLeftTab}
                onTabChange={setActiveLeftTab}
            />
            <ChatRightSheet isOpen={isOpenRightSheet} handleOpen={setIsOpenRightSheet} />
            <main className="flex flex-1 overflow-hidden pb-4 z-40 md:pt-0 pt-2 min-h-0">
                <ChatLeftPanel
                    conversations={conversations}
                    onDeleteConversation={onDeleteConversation}
                    activeTab={activeLeftTab}
                    onTabChange={setActiveLeftTab}
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
                    graphView={graphView}
                    cardData={cardData}
                    handleCardData={setCardData}
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
