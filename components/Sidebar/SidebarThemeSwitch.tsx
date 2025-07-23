'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface SidebarThemeSwitchProps {
    collapsed?: boolean;
    className?: string;
}

export function SidebarThemeSwitch({ collapsed = false, className }: SidebarThemeSwitchProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <li className="relative min-w-0">
            <button
                type="button"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                    'flex items-center w-full py-2 h-[4.1vh] rounded-md overflow-hidden',
                    className,
                    'text-sm text-left',
                    'transition-colors focus-visible:ring-2 outline-hidden',
                    'hover:bg-accent/50 hover:text-foreground',
                    'active:bg-accent/50 active:text-foreground',
                    'data-[active=true]:bg-accent/50 data-[active=true]:text-foreground data-[active=true]:font-medium',
                    'data-[state=open]:hover:bg-accent/50 data-[state=open]:hover:text-foreground',
                    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                )}
                title={collapsed ? (resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
            >
                <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 32 }}>
                    {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </span>
                <motion.span
                    animate={collapsed ? { opacity: 0, x: -16 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0 }}
                    className="truncate text-sm ml-2"
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
