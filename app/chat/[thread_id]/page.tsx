'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import deleteConversation from '@/api/chat/deleteConversation';
import { Menu, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ChatBox from '@/components/Chat/ChatBox';
import ChatConversations from '@/components/Chat/ChatConversations';
import ChatGraphModal from '@/components/Chat/ChatGraphModal';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import HeaderCornerMenu from '@/components/Header/HeaderCornerMenu';
import { MegaMenu } from '@/components/Header/MegaMenu';

export default function ChatPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { socket, conversations, setConversations } = useChatContext();

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

    return (
        <div className="flex flex-col h-screen w-full">
            <ChatGraphModal open={isOpenGraphModal} onOpenChange={setIsOpenGraphModal} />
            <header className="absolute top-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent z-50 pt-2">
                <div className="w-1/4 flex justify-end">
                    <MegaMenu isHomePage={pathname === '/'} />
                </div>
                <div className="w-1/4 flex justify-start">
                    <HeaderCornerMenu />
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
            <main className="flex flex-1 overflow-hidden pb-4">
                <aside className="w-1/4 hidden md:block overflow-y-auto pt-10">
                    <ChatConversations conversations={conversations} onDeleteConversation={onDeleteConversation} />
                </aside>

                <section className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto">
                        {socket ? (
                            <ChatBox socket={socket} setConversations={setConversations} />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <h5 className="text-muted-foreground">Connecting...</h5>
                            </div>
                        )}
                    </div>
                </section>

                <aside className="w-1/4 hidden md:block overflow-y-auto pt-10">
                    <Card className="h-full rounded-none border-0 shadow-none">
                        <CardContent className="p-0 pt-4">
                            <div
                                className="flex items-center gap-2 py-2 px-3 text-sm hover:bg-muted cursor-pointer rounded-md transition-colors"
                                onClick={() => setIsOpenGraphModal(true)}
                            >
                                <Network />
                                Open Graph
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </main>
            <footer className="absolute bottom-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent py-4">
                <div className="w-1/4 flex justify-end">
                    <div className="flex order-2 md:order-1 gap-2 font-normal text-2sm">
                        <span className="text-gray-600 dark:text-gray-600">© {new Date().getFullYear()}</span>
                        <span className="text-gray-600 dark:text-gray-600">LEXRAG PTE LTD</span>
                    </div>
                </div>
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
