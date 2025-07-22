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
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getMeClient();
            setUser(user);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setShowSettings(activeLeftTab === 'settings');
    }, [activeLeftTab]);

    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col">
            <div className="w-full flex flex-col h-full">
                {/* Header with tabs - sticky */}
                <div className="flex items-center justify-between p-3 pb-1 bg-background sticky top-0 z-10">
                    <ChatSidebarPanelHeader activeTab={activeLeftTab} setActiveTab={setActiveLeftTab} />
                </div>

                {/* Content area */}
                <div className="flex-1">
                    <ChatSidebarMenu
                        conversations={conversations}
                        onDeleteConversation={onDeleteConversation}
                        showSettings={showSettings}
                        className={showSettings ? 'max-h-[calc(100vh-13rem)]' : 'max-h-[calc(100vh-8.5rem)]'}
                    />
                </div>

                {/* Footer */}
                <ChatSidebarPanelFooter
                    showSettings={showSettings}
                    onToggleSettings={() => setActiveLeftTab('settings')}
                />
            </div>
        </aside>
    );
};

export default ChatLeftPanel;
