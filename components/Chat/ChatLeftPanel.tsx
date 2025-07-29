'use client';

import { useEffect, useState } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { Conversation } from '@/types/Conversation';
import { useUser } from '@/providers/user-provider';
import { ChatSidebarMenu } from './ChatSidebarMenu';
import { ChatSidebarPanelFooter } from './ChatSidebarPanelFooter';
import { ChatSidebarPanelHeader } from './ChatSidebarPanelHeader';

interface ChatLeftPanelProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    activeLeftTab: string;
    setActiveLeftTab: (tab: string) => void;
}

const ChatLeftPanel = ({
    conversations,
    onDeleteConversation,
    activeLeftTab,
    setActiveLeftTab,
}: ChatLeftPanelProps) => {
    const { setUser } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getMeClient();
            setUser(user);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col border-r">
            <div className="w-full flex flex-col h-full">
                <div className="flex items-center justify-between p-3 pb-1 bg-background sticky top-0 z-10">
                    <ChatSidebarPanelHeader
                        activeTab={activeLeftTab}
                        setActiveTab={setActiveLeftTab}
                        isSidebarOpen={isSidebarOpen}
                        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
                    />
                </div>

                <div className="flex-1">
                    <ChatSidebarMenu
                        conversations={conversations}
                        onDeleteConversation={onDeleteConversation}
                        showSettings={false}
                        isSidebarOpen={isSidebarOpen}
                    />
                </div>

                <ChatSidebarPanelFooter />
            </div>
        </aside>
    );
};

export default ChatLeftPanel;
