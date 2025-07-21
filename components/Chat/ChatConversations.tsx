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
            <CardContent className="p-3">
                <div className="max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                        {conversations.map(({ thread_id, title }) => (
                            <li
                                key={thread_id}
                                className="group flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-muted transition-colors"
                            >
                                <Link
                                    className="text-sm text-gray-800 truncate max-w-[85%]"
                                    href={`/chat/${thread_id}`}
                                >
                                    {title}
                                </Link>
                                <div
                                    className="hidden group-hover:block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onDeleteConversation(thread_id);
                                    }}
                                >
                                    <Trash2
                                        size={16}
                                        className="text-muted-foreground hover:text-destructive transition"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChatConversations;
