'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useDirection } from '@radix-ui/react-direction';
import { ClockArrowDown, ClockArrowUp, MessageSquare, MessageSquarePlus, Trash2 } from 'lucide-react';
import { Conversation } from '@/types/Conversation';

import { useUser } from '@/providers/user-provider';
import ChatSettingsSheetMenu from '@/components/Chat/ChatSettingsSheetMenu';
import ProfileBar from '@/components/Chat/ProfileBar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface ChatLeftSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
    conversations: Conversation[];
    handleDeleteConversation: (threadId: string) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const ChatLeftSheet = ({ isOpen, handleOpen, conversations, handleDeleteConversation, activeTab, onTabChange }: ChatLeftSheetProps) => {
    const direction = useDirection();
    const [showSettings, setShowSettings] = useState(false);

    const { user } = useUser();

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="left" dir={direction} close={false} className="p-0">
                <Card className="h-full rounded-none border-0 relative">
                    <CardHeader className="border-none">
                        <Tabs
                            value={activeTab}
                            onValueChange={onTabChange}
                        >
                            <TabsList className="w-fit grid grid-cols-3 mt-2">
                                <TabsTrigger
                                    value="chats"
                                    className="text-[12px] py-1 px-2"
                                >
                                    <MessageSquare />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="1"
                                    className="text-[12px] py-1 px-2"
                                >
                                    <ClockArrowDown />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="2"
                                    className="text-[12px] py-1 px-2"
                                >
                                    <ClockArrowUp />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="w-full flex items-center justify-between gap-3">
                            <Input placeholder="Search" />
                            <Link href="/chat/new">
                                <MessageSquarePlus className="size-5" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2 p-0 relative min-h-[200px]">
                        {showSettings ? (
                            <ChatSettingsSheetMenu open={true} />
                        ) : (
                            <div>
                                {conversations.map(({ thread_id, title }) => (
                                    <Link
                                        key={thread_id}
                                        className="flex items-center justify-between py-2 px-3 border-b border-dashed last:border-none text-sm over:bg-muted cursor-pointer rounded-md transition-colors"
                                        href={`/chat/${thread_id}`}
                                    >
                                        <span className="truncate w-[calc(100%-30px)]">{title}</span>
                                        <Trash2
                                            className="size-5 text-muted-foreground hover:text-destructive transition-colors"
                                            onClick={() => handleDeleteConversation(thread_id)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
                <ProfileBar 
                    user={user} 
                    showSettings={showSettings}
                    onToggleSettings={() => setShowSettings(!showSettings)}
                />
            </SheetContent>
        </Sheet>
    );
};

export default ChatLeftSheet;
