'use client';

import Link from 'next/link';
import { ClockArrowDown, ClockArrowUp, MessageSquare, MessageSquarePlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { Logo } from '@/components/Header/Logo';

interface ChatSidebarHeaderProps {
    activeTab: string;
    isHomePage: boolean;
    onTabChange: (tab: string) => void;
}

export function ChatSidebarHeader({ activeTab, onTabChange }: ChatSidebarHeaderProps) {
    const handleInputChange = () => {};

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-2 mb-3">
                <Link href="/" className="ps-3">
                    <Logo isHomePage={false} />
                </Link>

                <div className="flex items-center gap-1">
                    <div 
                        className={`flex items-center justify-center w-8 h-8 rounded-md border border-input transition-colors cursor-pointer ${activeTab === 'chats' ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
                        onClick={() => onTabChange('chats')}
                    >
                        <MessageSquare className="h-4 w-4" />
                    </div>
                    <div 
                        className={`flex items-center justify-center w-8 h-8 rounded-md border border-input transition-colors cursor-pointer ${activeTab === '1' ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
                        onClick={() => onTabChange('1')}
                    >
                        <ClockArrowDown className="h-4 w-4" />
                    </div>
                    <div 
                        className={`flex items-center justify-center w-8 h-8 rounded-md border border-input transition-colors cursor-pointer ${activeTab === '2' ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
                        onClick={() => onTabChange('2')}
                    >
                        <ClockArrowUp className="h-4 w-4" />
                    </div>
                </div>
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