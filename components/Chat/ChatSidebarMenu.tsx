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
                <div className="max-h-80 overflow-y-auto">
                    <ul>
                        {conversations.map(({ thread_id, title }) => (
                            <li
                                key={thread_id}
                                className="group flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-muted transition-colors"
                            >
                                <Link
                                    className="text-sm text-gray-800 truncate max-w-[85%]"
                                    href={`/chat/${thread_id}`}
                                >
                                    {title || 'New chat'}
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
            )}
        </div>
    );
}
