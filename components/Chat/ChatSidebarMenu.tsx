'use client';

import { cn } from '@/lib/utils';
import { ChatItem } from '@/components/Chat/ChatItem';
import { SidebarMenu } from '@/components/Sidebar/SidebarMenu';
import { useChatContext } from './ChatProvider';
import UserDocuments from './UserDocuments';

interface ChatSidebarMenuProps {
    showSettings: boolean;
    className?: string;
    isSidebarOpen: boolean;
    activeTab: string;
}

export function ChatSidebarMenu({ showSettings, className, isSidebarOpen, activeTab }: ChatSidebarMenuProps) {
    const { conversations } = useChatContext();

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
                        {activeTab === 'chats' && (
                            <ul>
                                {conversations.map(({ thread_id, title, isGenerating, isTitleGenerating }) => (
                                    <ChatItem
                                        key={thread_id}
                                        thread_id={thread_id}
                                        title={title}
                                        isGenerating={isGenerating}
                                        isTitleGenerating={isTitleGenerating}
                                    />
                                ))}
                            </ul>
                        )}
                        {activeTab === 'files' && <UserDocuments />}
                    </div>
                )}
            </div>
        </div>
    );
}
