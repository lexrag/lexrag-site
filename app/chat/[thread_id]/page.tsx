'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import deleteConversation from '@/api/chat/deleteConversation';
import { ClockArrowDown, ClockArrowUp, Expand, Menu, MessageSquare, Network, Rows3 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatBox from '@/components/Chat/ChatBox';
import ChatGraphModal from '@/components/Chat/ChatGraphModal';
import ChatLeftPanel from '@/components/Chat/ChatLeftPanel';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightPanel from '@/components/Chat/ChatRightPanel';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import { MegaMenu } from '@/components/Header/MegaMenu';

export default function ChatPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { socket, conversations, setConversations } = useChatContext();

    const [rightPanelView, setRightPanelView] = useState<string>('card');
    const [graphView, setGraphView] = useState<string>('2d');
    const [isOpenLeftSheet, setIsOpenLeftSheet] = useState<boolean>(false);
    const [isOpenRightSheet, setIsOpenRightSheet] = useState<boolean>(false);
    const [isOpenGraphModal, setIsOpenGraphModal] = useState<boolean>(false);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
    };

    if (!socket) return null;

    return (
        <div className="flex flex-col h-screen w-full">
            <ChatGraphModal open={isOpenGraphModal} onOpenChange={setIsOpenGraphModal} graphView={graphView} />
            <header className="absolute top-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent z-50 pt-2 px-3">
                <div className="w-1/4 flex items-center justify-between">
                    <Tabs defaultValue="chats">
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
                    <Tabs value={rightPanelView} onValueChange={setRightPanelView}>
                        <TabsList className="w-fit grid grid-cols-2">
                            <TabsTrigger value="card" className="text-[12px] py-1 px-2">
                                <Rows3 />
                            </TabsTrigger>
                            <TabsTrigger value="graph" className="text-[12px] py-1 px-2">
                                <Network />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {rightPanelView === 'graph' && (
                        <>
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
                            <Expand onClick={() => setIsOpenGraphModal(true)} />
                        </>
                    )}
                </div>
            </header>
            <header className="w-full flex md:hidden items-center justify-between pt-2 px-2">
                <Menu className="size-6" onClick={() => setIsOpenLeftSheet((prevState) => !prevState)} />
                <MegaMenu isHomePage={pathname === '/'} />
                <Menu className="size-6" onClick={() => setIsOpenRightSheet((prevState) => !prevState)} />
            </header>
            <ChatLeftSheet
                isOpen={isOpenLeftSheet}
                handleOpen={setIsOpenLeftSheet}
                conversations={conversations}
                handleDeleteConversation={onDeleteConversation}
            />
            <ChatRightSheet isOpen={isOpenRightSheet} handleOpen={setIsOpenRightSheet} />
            <main className="flex flex-1 overflow-hidden pb-4 z-40">
                <ChatLeftPanel conversations={conversations} onDeleteConversation={onDeleteConversation} />

                <section className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto">
                        <ChatBox socket={socket} setConversations={setConversations} />
                    </div>
                </section>

                <ChatRightPanel panelView={rightPanelView} graphView={graphView} />
            </main>
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
