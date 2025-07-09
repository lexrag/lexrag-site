'use client';

import Link from 'next/link';
import { MessageSquarePlus, Trash2 } from 'lucide-react';
import { Conversation } from '@/types/Conversation';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';

interface ChatConversationsProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
}

const ChatConversations = ({ conversations, onDeleteConversation }: ChatConversationsProps) => {
    return (
        <Card className="rounded-none border-0 shadow-none">
            <CardHeader className="border-none p-3">
                <div className="w-full flex items-center justify-between gap-5">
                    <Input placeholder="Search" />
                    <Link href="/chat/new">
                        <MessageSquarePlus className="size-5" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
                {conversations.map(({ thread_id, title }) => (
                    <Link
                        key={thread_id}
                        className="flex items-center justify-between py-2 px-3 text-sm hover:bg-muted cursor-pointer rounded-md transition-colors"
                        href={`/chat/${thread_id}`}
                    >
                        <span className="truncate w-[calc(100%-30px)]">{title}</span>
                        <Trash2
                            className="size-4 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => onDeleteConversation(thread_id)}
                        />
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};

export default ChatConversations;
