'use client';

import { useEffect } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { Conversation } from '@/types/Conversation';
import { useUser } from '@/providers/user-provider';
import ChatConversations from '@/components/Chat/ChatConversations';
import ChatSettingsPanelMenu from '@/components/Chat/ChatSettingsPanelMenu';

interface ChatLeftPanelProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
}

const ChatLeftPanel = ({ conversations, onDeleteConversation }: ChatLeftPanelProps) => {
    const { setUser } = useUser();

    useEffect(() => {
        (async () => {
            const user = await getMeClient();
            setUser(user);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col overflow-y-auto pt-10">
            <div className="flex-1 overflow-y-auto">
                <ChatConversations conversations={conversations} onDeleteConversation={onDeleteConversation} />
                <ChatSettingsPanelMenu />
            </div>
        </aside>
    );
};

export default ChatLeftPanel;
