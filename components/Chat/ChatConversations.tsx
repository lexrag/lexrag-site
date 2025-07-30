'use client';

import Link from 'next/link';
import { MessageSquarePlus } from 'lucide-react';
import { Conversation } from '@/types/Conversation';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { ChatItem } from './ChatItem';

interface ChatConversationsProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    onRenameConversation?: (threadId: string, newTitle: string) => void;
}

const ChatConversations = ({ conversations, onDeleteConversation, onRenameConversation }: ChatConversationsProps) => {
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
                        {conversations.map(({ thread_id, title, isGenerating, isTitleGenerating }) => (
                            <li key={thread_id}>
                                <ChatItem
                                    thread_id={thread_id}
                                    title={title}
                                    onDeleteConversation={onDeleteConversation}
                                    onRenameConversation={onRenameConversation}
                                    isGenerating={isGenerating}
                                    isTitleGenerating={isTitleGenerating}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChatConversations;
