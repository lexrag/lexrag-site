'use client';

import { useEffect, useState } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { Conversation } from '@/types/Conversation';
import { useUser } from '@/providers/user-provider';
import { ChatSidebarHeader } from './ChatSidebarHeader';
import { ChatSidebarMenu } from './ChatSidebarMenu';
import { ChatSidebarFooter } from './ChatSidebarFooter';


interface ChatLeftPanelProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    activeLeftTab: string;
    setActiveLeftTab: (tab: string) => void;
}

const ChatLeftPanel = ({ conversations, onDeleteConversation, activeLeftTab, setActiveLeftTab }: ChatLeftPanelProps) => {
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
        if (activeLeftTab !== 'none') {
            setShowSettings(false);
        }
    }, [activeLeftTab]);

    const handleToggleSettings = () => {
        const newShowSettings = !showSettings;
        setShowSettings(newShowSettings);
        
        if (newShowSettings) {
            setActiveLeftTab('none');
        } else {
            setActiveLeftTab('chats');
        }
    };

    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col">
            <div className="w-full flex flex-col h-full">
                {/* Header with tabs - sticky */}
                <div className="flex items-center justify-between p-3 bg-background sticky top-0 z-10">
                    <ChatSidebarHeader 
                        activeTab={activeLeftTab}
                        onTabChange={setActiveLeftTab}
                        isHomePage={false}
                    />
                </div>
                
                {/* Content area */}
                <div className="flex-1">
                    <ChatSidebarMenu 
                        conversations={conversations}
                        onDeleteConversation={onDeleteConversation}
                        showSettings={showSettings}
                    />
                </div>
                
                {/* Footer */}
                <ChatSidebarFooter 
                    showSettings={showSettings}
                    onToggleSettings={handleToggleSettings}
                />
            </div>
        </aside>
    );
};

export default ChatLeftPanel;
