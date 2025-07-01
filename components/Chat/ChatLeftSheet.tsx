'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useDirection } from '@radix-ui/react-direction';
import { RiChatNewLine, RiDeleteBinLine } from 'react-icons/ri';
import { Conversation } from '@/types/Conversation';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';

interface ChatLeftSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
    conversations: Conversation[];
    handleDeleteConversation: (threadId: string) => void;
}

const ChatLeftSheet = ({ isOpen, handleOpen, conversations, handleDeleteConversation }: ChatLeftSheetProps) => {
    const direction = useDirection();

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="left" dir={direction} close={false} className="p-0">
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
                                href={`chat/${thread_id}`}
                            >
                                <span className="truncate w-[calc(100%-30px)]">{title}</span>
                                <RiDeleteBinLine
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    onClick={() => handleDeleteConversation(thread_id)}
                                />
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </SheetContent>
        </Sheet>
    );
};

export default ChatLeftSheet;
