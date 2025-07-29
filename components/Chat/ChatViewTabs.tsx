import { ClockArrowDown, ClockArrowUp, MessageSquare, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChatViewTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isSettings?: boolean;
}

export default function ChatViewTabs({ activeTab, onTabChange, isSettings }: ChatViewTabsProps) {
    return (
        <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="flex items-center w-full py-1 md:py-2 gap-2 md:gap-1">
                <TabsTrigger value="chats" className="flex-1 min-w-0 p-2 md:p-1">
                    <MessageSquare className="h-7 w-7 md:h-5 md:w-5 mx-auto" />
                </TabsTrigger>
                <TabsTrigger value="new" className="flex-1 min-w-0 p-2 md:p-1">
                    <ClockArrowDown className="h-7 w-7 md:h-5 md:w-5 mx-auto" />
                </TabsTrigger>
                <TabsTrigger value="old" className="flex-1 min-w-0 p-2 md:p-1">
                    <ClockArrowUp className="h-7 w-7 md:h-5 md:w-5 mx-auto" />
                </TabsTrigger>
                {isSettings && (
                    <TabsTrigger value="settings" className="flex-1 min-w-0 p-2 md:p-1">
                        <Settings className="h-7 w-7 md:h-5 md:w-5 mx-auto" />
                    </TabsTrigger>
                )}
            </TabsList>
        </Tabs>
    );
}
