import React from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { ChatMenuItem } from '@/components/Chat/ChatMenuItem';
import { MENU_ITEMS } from '@/components/Chat/MENU_ITEMS';

interface ChatSettingsSheetMenuProps {
    open: boolean;
}

export default function ChatSettingsSheetMenu({ open }: ChatSettingsSheetMenuProps) {
    const { setTheme, resolvedTheme } = useTheme();

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    if (!open) return null;

    return (
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
            <div className="flex items-center justify-between px-5 pb-4 pt-2">
                <span className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Dark mode
                </span>
                <Switch size="sm" checked={resolvedTheme === 'dark'} onCheckedChange={handleThemeToggle} />
            </div>
        </div>
    );
}
