import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ChatMenuItem } from '@/components/Chat/ChatMenuItem';
import { MENU_ITEMS } from '@/components/Chat/MENU_ITEMS';

export default function ChatSettingsMenu() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <div>
                <div className="flex flex-col gap-1">
                    {MENU_ITEMS.map((item) => (
                        <ChatMenuItem
                            key={item.name}
                            href={item.href}
                            icon={<item.icon className="h-5 w-5" />}
                            name={item.name}
                        />
                    ))}
                </div>
            </div>
            <div className="px-3 pt-2 bg-background">
                <div
                    className="flex flex-row items-center gap-3 px-3 py-3 rounded-md hover:bg-accent/50 text-base cursor-pointer"
                    onClick={handleThemeToggle}
                >
                    {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span>{resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </div>
            </div>
        </div>
    );
}
