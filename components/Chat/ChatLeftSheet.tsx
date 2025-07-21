'use client';

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { Conversation } from '@/types/Conversation';
import { ChatSidebarHeader } from './ChatSidebarHeader';
import { ChatSidebarMenu } from './ChatSidebarMenu';
import { ChatSidebarFooter } from './ChatSidebarFooter';

import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';

interface ChatLeftSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
    conversations: Conversation[];
    handleDeleteConversation: (threadId: string) => void;
    activeLeftTab: string;
    setActiveLeftTab: (tab: string) => void;
}

const ChatLeftSheet = ({ isOpen, handleOpen, conversations, handleDeleteConversation, activeLeftTab, setActiveLeftTab }: ChatLeftSheetProps) => {
    const direction = useDirection();
    const [showSettings, setShowSettings] = useState(false);

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
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="left" dir={direction} close={false} className="p-0">
                <div className="h-full flex flex-col">
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
                                onDeleteConversation={handleDeleteConversation}
                                showSettings={showSettings}
                            />
                        </div>
                        
                        {/* Footer */}
                        <ChatSidebarFooter 
                            showSettings={showSettings}
                            onToggleSettings={handleToggleSettings}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ChatLeftSheet;
