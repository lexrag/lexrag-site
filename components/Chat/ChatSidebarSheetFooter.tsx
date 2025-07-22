'use client';

import ChatViewTabs from '@/components/Chat/ChatViewTabs';

interface ChatSidebarSheetFooterProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function ChatSidebarSheetFooter({ activeTab, onTabChange }: ChatSidebarSheetFooterProps) {
    return (
        <div className="shrink-0">
            <ChatViewTabs activeTab={activeTab} onTabChange={onTabChange} isSettings={true} />
        </div>
    );
}
