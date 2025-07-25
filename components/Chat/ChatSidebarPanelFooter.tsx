'use client';

import { useUser } from '@/providers/user-provider';
import ProfileBar from '@/components/Chat/ProfileBar';

export function ChatSidebarPanelFooter() {
    const { user } = useUser();
    return (
        <div className="shrink-0">
            <ProfileBar user={user} />
        </div>
    );
}
