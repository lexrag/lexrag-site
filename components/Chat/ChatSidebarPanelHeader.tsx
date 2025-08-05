'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { uploadUserDocuments } from '@/api/chat/uploadUserDocuments';
import { ChevronLeft, ChevronRight, FilePlus, MessageSquarePlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatViewTabs from '@/components/Chat/ChatViewTabs';
import { Logo } from '@/components/Header/Logo';
import { useChatContext } from './ChatProvider';

interface ChatSidebarPanelHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isSidebarOpen: boolean;
    onSidebarToggle: () => void;
}

export function ChatSidebarPanelHeader({
    activeTab,
    setActiveTab,
    isSidebarOpen,
    onSidebarToggle,
}: ChatSidebarPanelHeaderProps) {
    const { setUserDocuments } = useChatContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = () => {};

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log(files[0]);

            const data = await uploadUserDocuments(files[0]);

            if (!!data) {
                setUserDocuments((prevState) => [
                    ...prevState,
                    {
                        filename: data.document,
                        uri: '',
                        user_id: 22,
                    },
                ]);
            }
        }

        event.target.value = '';
    };

    return (
        <div className="w-full sticky top-0 z-[120] bg-background">
            <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        onClick={onSidebarToggle}
                    >
                        {isSidebarOpen ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                    </Button>
                    <Link href="/" className="ps-1">
                        <Logo />
                    </Link>
                </div>
                <ChatViewTabs activeTab={activeTab} onTabChange={setActiveTab} isSettings={false} />
            </div>

            <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 size-4" />
                {activeTab === 'chats' && (
                    <>
                        <Input
                            placeholder="Search conversations"
                            onChange={handleInputChange}
                            className="pl-9 pr-9"
                            value=""
                        />
                        <Link href="/chat/new" className="absolute right-3 top-1/2 -translate-y-1/2">
                            <MessageSquarePlus className="size-4 text-muted-foreground hover:text-primary" />
                        </Link>
                    </>
                )}
                {activeTab === 'files' && (
                    <>
                        <Input
                            placeholder="Search documents"
                            onChange={handleInputChange}
                            className="pl-9 pr-9"
                            value=""
                        />
                        <button
                            onClick={handleFileButtonClick}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            title="Upload files"
                        >
                            <FilePlus className="size-4 text-muted-foreground hover:text-primary" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.xls,.json,.xml"
                        />
                    </>
                )}
            </div>
        </div>
    );
}
