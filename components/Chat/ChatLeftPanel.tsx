'use client';

import { useEffect, useState } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { Conversation } from '@/types/Conversation';
import { useUser } from '@/providers/user-provider';
import ChatConversations from '@/components/Chat/ChatConversations';
import ChatSettingsPanelMenu from '@/components/Chat/ChatSettingsPanelMenu';
import ProfileBar from '@/components/Chat/ProfileBar';

interface ChatLeftPanelProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const ChatLeftPanel = ({ conversations, onDeleteConversation, activeTab, onTabChange }: ChatLeftPanelProps) => {
    const { setUser, user } = useUser();
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getMeClient();
            setUser(user);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Сбрасываем настройки при переключении табов
    useEffect(() => {
        if (activeTab !== 'none') {
            setShowSettings(false);
        }
    }, [activeTab]);

    // Деактивируем таб при открытии настроек
    const handleToggleSettings = () => {
        const newShowSettings = !showSettings;
        setShowSettings(newShowSettings);
        
        // Если открываем настройки, деактивируем все табы
        if (newShowSettings) {
            onTabChange('none');
        } else {
            // Если закрываем настройки, возвращаемся к табу chats
            onTabChange('chats');
        }
    };

    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col overflow-y-auto pt-10">
            <div className="flex-1 overflow-y-auto">
                {showSettings ? (
                    <ChatSettingsPanelMenu />
                ) : (
                    <ChatConversations conversations={conversations} onDeleteConversation={onDeleteConversation} />
                )}
            </div>
            <ProfileBar 
                user={user} 
                showSettings={showSettings}
                onToggleSettings={handleToggleSettings}
            />
        </aside>
    );
};

export default ChatLeftPanel;
