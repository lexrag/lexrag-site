'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { Conversation } from '@/types/Conversation';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { ChatSidebarMenu } from './ChatSidebarMenu';
import { ChatSidebarSheetFooter } from './ChatSidebarSheetFooter';
import { ChatSidebarSheetHeader } from './ChatSidebarSheetHeader';

interface ChatLeftSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
    conversations: Conversation[];
    handleDeleteConversation: (threadId: string) => void;
    activeLeftTab: string;
    setActiveLeftTab: (tab: string) => void;
}

const ChatLeftSheet = ({
    isOpen,
    handleOpen,
    conversations,
    handleDeleteConversation,
    activeLeftTab,
    setActiveLeftTab,
}: ChatLeftSheetProps) => {
    const direction = useDirection();
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        setShowSettings(activeLeftTab === 'settings');
    }, [activeLeftTab]);

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="left" dir={direction} close={false} className="p-0">
                <div className="h-full flex flex-col">
                    <div className="w-full flex flex-col h-full">
                        {/* Header with tabs - sticky */}
                        <div className="flex items-center justify-between p-3 bg-background sticky top-0 z-10">
                            <ChatSidebarSheetHeader />
                        </div>

                        {/* Content area */}
                        <div className="flex-1">
                            <ChatSidebarMenu
                                conversations={conversations}
                                onDeleteConversation={handleDeleteConversation}
                                showSettings={showSettings}
                                className="max-h-[calc(100vh-8.5rem)]"
                            />
                        </div>

                        {/* Footer */}
                        <ChatSidebarSheetFooter activeTab={activeLeftTab} onTabChange={setActiveLeftTab} />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ChatLeftSheet;
