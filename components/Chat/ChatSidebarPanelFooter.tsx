'use client';

import { useUser } from '@/providers/user-provider';
import ProfileBar from '@/components/Chat/ProfileBar';

interface ChatSidebarPanelFooterProps {
    showSettings: boolean;
    onToggleSettings: () => void;
}

export function ChatSidebarPanelFooter({ showSettings, onToggleSettings }: ChatSidebarPanelFooterProps) {
    const { user } = useUser();
    return (
        <div className="shrink-0">
            <ProfileBar user={user} showSettings={showSettings} onToggleSettings={onToggleSettings} />
        </div>
    );
}
