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
    isSidebarOpen: boolean;
}

export function ChatSidebarMenu({
    conversations,
    onDeleteConversation,
    showSettings,
    className,
    isSidebarOpen,
}: ChatSidebarMenuProps) {
    return (

        <div className={cn('relative flex flex-row min-h-0 h-full', className)}>
            <div
                className={cn(
                    'transition-all duration-300 group hidden md:block bg-background border-r absolute left-0 top-0 z-[50] h-full',
                    isSidebarOpen ? 'w-[25vw] min-w-[192px]' : 'w-14 min-w-14',
                )}
            >
                <SidebarMenu collapsed={!isSidebarOpen} noGroups />
            </div>
            <div
                className={cn(
                    `flex flex-col flex-1 min-h-0 transition-all duration-300 min-w-0`,
                    isSidebarOpen ? 'md:pl-[25vw]' : 'md:pl-14',
                )}
            >
                {showSettings ? (
                    <SidebarMenu noGroups />
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
        </div>
    );
}
