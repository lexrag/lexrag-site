'use client';

import Link from 'next/link';
import { MessageSquarePlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ChatViewTabs from '@/components/Chat/ChatViewTabs';
import { Logo } from '@/components/Header/Logo';

interface ChatSidebarPanelHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function ChatSidebarPanelHeader({ activeTab, setActiveTab }: ChatSidebarPanelHeaderProps) {
    const handleInputChange = () => {};

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-2 mb-3">
                <Link href="/" className="ps-3">
                    <Logo isHomePage={false} />
                </Link>
                <ChatViewTabs activeTab={activeTab} onTabChange={setActiveTab} isSettings={false} />
            </div>

            <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 size-4" />
                <Input placeholder="Search conversations" onChange={handleInputChange} className="pl-9 pr-9" value="" />
                <Link href="/chat/new" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <MessageSquarePlus className="size-4 text-muted-foreground hover:text-primary" />
                </Link>
            </div>
        </div>
    );
}
