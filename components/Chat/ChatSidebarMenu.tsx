'use client';

import { Conversation } from '@/types/Conversation';
import { cn } from '@/lib/utils';
import { ChatItem } from '@/components/Chat/ChatItem';
import { SidebarMenu } from '@/components/Sidebar/SidebarMenu';

interface ChatSidebarMenuProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    showSettings: boolean;
    className?: string;
}

export function ChatSidebarMenu({
    conversations,
    onDeleteConversation,
    showSettings,
    className,
}: ChatSidebarMenuProps) {
    return (
        <div className={cn('flex flex-col min-h-0', className)}>
            {showSettings ? (
                <SidebarMenu />
            ) : (
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <ul>
                        {conversations.map(({ thread_id, title }) => (
                            <ChatItem
                                key={thread_id}
                                thread_id={thread_id}
                                title={title}
                                onDeleteConversation={onDeleteConversation}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
