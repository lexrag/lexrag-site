'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Conversation } from '@/types/Conversation';

import ChatSettingsPanelMenu from '@/components/Chat/ChatSettingsPanelMenu';

interface ChatSidebarMenuProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    showSettings: boolean;
}

export function ChatSidebarMenu({ conversations, onDeleteConversation, showSettings }: ChatSidebarMenuProps) {
    return (
        <div className="kt-scrollable-y-auto grow max-h-[calc(100vh-11.5rem)]">
            {showSettings ? (
                <ChatSettingsPanelMenu />
            ) : (
                <div className="p-3">
                    {conversations.map(({ thread_id, title }) => (
                        <Link
                            key={thread_id}
                            className="flex items-center justify-between py-2 px-3 border-b border-dashed last:border-none text-sm hover:bg-muted cursor-pointer rounded-md transition-colors"
                            href={`/chat/${thread_id}`}
                        >
                            <span className="truncate w-[calc(100%-30px)]">{title}</span>
                            <Trash2
                                className="size-5 text-muted-foreground hover:text-destructive transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDeleteConversation(thread_id);
                                }}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
} 