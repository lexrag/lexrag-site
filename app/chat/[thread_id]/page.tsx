'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import deleteConversation from '@/api/chat/deleteConversation';
import { getConversations } from '@/api/chat/getConversations';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import { RiChatNewLine, RiDeleteBinLine } from 'react-icons/ri';
import { Conversation } from '@/types/Conversation';
import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ChatBox from '@/components/Chat/ChatBox';
import ChatLeftSheet from '@/components/Chat/ChatLeftSheet';
import { ChatSocketContext } from '@/components/Chat/ChatProvider';
import ChatRightSheet from '@/components/Chat/ChatRightSheet';
import HeaderCornerMenu from '@/components/Header/HeaderCornerMenu';
import { Logo } from '@/components/Header/Logo';

export default function ChatPage() {
    const pathname = usePathname();
    const socket = useContext(ChatSocketContext);
    const router = useRouter();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isOpenLeftSheet, setIsOpenLeftSheet] = useState<boolean>(false);
    const [isOpenRightSheet, setIsOpenRightSheet] = useState<boolean>(false);

    useEffect(() => {
        const fetchConversations = async () => {
            const result = await getConversations();
            setConversations(result.reverse());
        };
        fetchConversations();
    }, []);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <header className="h-[60px] w-full hidden md:flex items-center justify-between border-b">
                <div className="w-1/4" />
                <div className="w-1/2">
                    <Logo isHomePage={pathname === '/'} />
                </div>

                <div className="w-1/4 flex justify-start">
                    <HeaderCornerMenu />
                </div>
            </header>
            <header className="h-[60px] w-full flex md:hidden items-center justify-between border-b px-2">
                <MdMenu className="size-6" onClick={() => setIsOpenLeftSheet((prevState) => !prevState)} />
                <Logo isHomePage={pathname === '/'} />
                <AiOutlineMenuUnfold
                    className="size-6"
                    onClick={() => setIsOpenRightSheet((prevState) => !prevState)}
                />
            </header>
            <ChatLeftSheet
                isOpen={isOpenLeftSheet}
                handleOpen={setIsOpenLeftSheet}
                conversations={conversations}
                handleDeleteConversation={onDeleteConversation}
            />
            <ChatRightSheet isOpen={isOpenRightSheet} handleOpen={setIsOpenRightSheet} />
            <main className="flex flex-1 overflow-hidden">
                <aside className="w-1/4 hidden md:block border-r overflow-y-auto">
                    <Card className="h-full rounded-none border-0">
                        <CardHeader className="border-none p-3">
                            <div className="w-full flex items-center justify-between gap-5">
                                <Input placeholder="Search" />
                                <Link href="/chat/new">
                                    <RiChatNewLine className="size-5" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="p-3 space-y-2">
                            {conversations.map(({ thread_id, title }) => (
                                <Link
                                    key={thread_id}
                                    className="flex items-center justify-between py-2 px-3 border-b border-dashed last:border-none text-sm over:bg-muted cursor-pointer rounded-md transition-colors"
                                    href={`/chat/${thread_id}`}
                                >
                                    <span className="truncate w-[calc(100%-30px)]">{title}</span>
                                    <RiDeleteBinLine
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                        onClick={() => onDeleteConversation(thread_id)}
                                    />
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
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

                <aside className="w-1/4 hidden md:block border-l overflow-y-auto">
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
        </div>
    );
}
