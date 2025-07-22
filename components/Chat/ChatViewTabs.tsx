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
            <TabsList className="flex items-center w-full py-2">
                <TabsTrigger value="chats" className="flex-1 min-w-0">
                    <MessageSquare className="h-6 w-6 mx-auto" />
                </TabsTrigger>
                <TabsTrigger value="new" className="flex-1 min-w-0">
                    <ClockArrowDown className="h-6 w-6 mx-auto" />
                </TabsTrigger>
                <TabsTrigger value="old" className="flex-1 min-w-0">
                    <ClockArrowUp className="h-6 w-6 mx-auto" />
                </TabsTrigger>
                {isSettings && (
                    <TabsTrigger value="settings" className="flex-1 min-w-0">
                        <Settings className="h-6 w-6 mx-auto" />
                    </TabsTrigger>
                )}
            </TabsList>
        </Tabs>
    );
}
