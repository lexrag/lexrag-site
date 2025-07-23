'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface SidebarThemeSwitchProps {
    collapsed?: boolean;
}

export function SidebarThemeSwitch({ collapsed = false }: SidebarThemeSwitchProps) {
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
                title={collapsed ? (resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
            >
                <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 32 }}>
                    {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </span>
                <motion.span
                    animate={collapsed ? { opacity: 0, x: -16 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: collapsed ? 0 : 0.2 }}
                    className="truncate text-sm"
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                        pointerEvents: collapsed ? 'none' : 'auto',
                    }}
                >
                    {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
                </motion.span>
            </button>
        </li>
    );
}
