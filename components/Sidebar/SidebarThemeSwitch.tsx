'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function SidebarThemeSwitch() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <li className="relative">
            <button
                type="button"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                    'peer/menu-button ring-default active:bg-state-soft active:text-default data-[active=true]:bg-state-soft data-[active=true]:text-default data-[state=open]:hover:bg-state-soft data-[state=open]:hover:text-default outline-hidden group-has-data-[sidebar=menu-action]/menu-item:pr-8 w-full overflow-hidden rounded-md p-2 text-left transition-colors focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent/50 hover:text-default h-8 text-sm flex items-center gap-2 py-2',
                )}
            >
                {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
        </li>
    );
}
