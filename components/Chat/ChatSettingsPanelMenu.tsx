import React, { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createPortal } from 'react-dom';
import { useLogOut } from '@/hooks/use-log-out';
import { useUser } from '@/providers/user-provider';
import { Switch } from '@/components/ui/switch';
import { ChatMenuItem } from '@/components/Chat/ChatMenuItem';
import { MENU_ITEMS } from '@/components/Chat/MENU_ITEMS';
import ProfileBar from '@/components/Chat/ProfileBar';

const PROFILE_HEIGHT = 80;

export default function ChatSettingsPanelMenu() {
    const logOut = useLogOut();
    const { user } = useUser();
    const { setTheme, resolvedTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const menu = (
        <aside className="fixed left-0 bottom-0 h-7/8 w-1/4 z-50 pointer-events-none hidden md:block">
            <div
                className={`
                    absolute left-0 w-full
                    transition-transform duration-300
                    bottom-[${PROFILE_HEIGHT}px]
                    bg-background
                    shadow-lg
                    pointer-events-auto
                    rounded-t-xl
                    overflow-hidden
                `}
                style={{
                    height: `calc(100% - ${PROFILE_HEIGHT}px)`,
                    transform: open ? 'translateY(0)' : `translateY(100%)`,
                }}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2 pt-2 pb-2">
                        {MENU_ITEMS.map((item) => (
                            <ChatMenuItem
                                key={item.name}
                                href={item.href}
                                icon={<item.icon className="h-5 w-5" />}
                                name={item.name}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-between px-6 pb-4 pt-2">
                        <span className="flex items-center gap-2">
                            <Moon className="h-5 w-5" />
                            Dark mode
                        </span>
                        <Switch size="sm" checked={resolvedTheme === 'dark'} onCheckedChange={handleThemeToggle} />
                    </div>
                </div>
            </div>
            <ProfileBar
                user={user}
                mode={open ? 'settings' : 'default'}
                onSettings={() => setOpen((v) => !v)}
                onLogOut={logOut}
            />
        </aside>
    );

    if (!mounted) return null;
    return createPortal(menu, document.body);
}
