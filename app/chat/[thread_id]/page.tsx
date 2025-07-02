'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import deleteConversation from '@/api/chat/deleteConversation';
import { Menu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';
import ChatBox from '@/components/Chat/ChatBox';
import ChatConversations from '@/components/Chat/ChatConversations';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { useChatContext } from '@/components/Chat/ChatProvider';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import HeaderCornerMenu from '@/components/Header/HeaderCornerMenu';
import { MegaMenu } from '@/components/Header/MegaMenu';
import Footer from '@/components/Layout/Footer';

export default function ChatPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { socket, conversations, setConversations } = useChatContext();

    const [isOpenLeftSheet, setIsOpenLeftSheet] = useState<boolean>(false);
    const [isOpenRightSheet, setIsOpenRightSheet] = useState<boolean>(false);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <header className="absolute top-0 left-0 w-full hidden md:flex items-center justify-between bg-transparent z-50">
                <div className="w-1/4 flex justify-end">
                    <MegaMenu isHomePage={pathname === '/'} />
                </div>
                <div className="w-1/4 flex justify-start">
                    <HeaderCornerMenu />
                </div>
            </header>
            <header className="w-full flex md:hidden items-center justify-between px-2">
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
            <main className="flex flex-1 overflow-hidden">
                <aside className="w-1/4 hidden md:block overflow-y-auto pt-8">
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

                <aside className="w-1/4 hidden md:block overflow-y-auto pt-8">
                    <Card className="h-full rounded-none border-0">
                        <CardHeader className="border-none p-3">
                            <CardHeading>
                                <CardTitle>Files</CardTitle>
                            </CardHeading>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </aside>
            </main>
            <Footer />
        </div>
    );
}
