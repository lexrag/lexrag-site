'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { getMeClient } from '@/api/auth/getMeClient';
import { Moon, Settings, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Conversation } from '@/types/Conversation';
import { useLogOut } from '@/hooks/use-log-out';
import { useUser } from '@/providers/user-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import ChatConversations from '@/components/Chat/ChatConversations';

interface ChatLeftPanelProps {
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
}

const ChatLeftPanel = ({ conversations, onDeleteConversation }: ChatLeftPanelProps) => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const getMe = async () => {
            const user = await getMeClient();
            setUser(user);
        };

        getMe();
    }, []);

    const { setTheme, resolvedTheme } = useTheme();
    const logOut = useLogOut();

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };
    return (
        <aside className="h-full w-1/4 hidden md:flex flex-col overflow-y-auto pt-10">
            <div className="flex-1 overflow-y-auto">
                <ChatConversations conversations={conversations} onDeleteConversation={onDeleteConversation} />
            </div>

            <div className="flex items-center justify-between py-2 px-4">
                <div className="flex items-center gap-2">
                    <div className="size-8 border-[#015A8D] bg-[#EFF6FF] dark:bg-[#172331] rounded-full inline-flex items-center justify-center text-xs font-semibold border text-primary cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-primary">
                        {user?.first_name?.slice(0, 1) || '?'}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                            <span className="text-sm text-gray-800 hover:text-primary font-semibold truncate">
                                {user?.first_name} {user?.last_name}
                            </span>
                            <span className="text-xs text-gray-600 hover:text-primary truncate">{user?.email}</span>
                        </div>
                        <Badge variant="primary" appearance="outline">
                            Pro
                        </Badge>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Settings />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" sideOffset={10} className="w-[250px] p-0 py-2">
                        <DropdownMenuItem asChild className="rounded-none">
                            <Link href="/profile" className="w-full px-4 py-2 flex items-center gap-2">
                                <UserRound />
                                My Profile
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild className="rounded-none" onSelect={(event) => event.preventDefault()}>
                            <div
                                className="w-full px-4 py-2 flex items-center justify-between"
                                onClick={handleThemeToggle}
                            >
                                <span className="flex items-center gap-2">
                                    <Moon />
                                    Dark mode
                                </span>
                                <Switch size="sm" checked={resolvedTheme === 'dark'} />
                            </div>
                        </DropdownMenuItem>

                        <div className="px-4 py-2">
                            <Button onClick={logOut} variant="outline" className="w-full justify-center">
                                Logout
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
};

export default ChatLeftPanel;
