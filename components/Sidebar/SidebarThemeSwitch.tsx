'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

    const content = resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode';
    const icon =
        resolvedTheme === 'dark' ? <Sun className="size-5 text-center" /> : <Moon className="size-5 text-center" />;
    const iconNotCollapsed = resolvedTheme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />;

    return (
        <li className="relative min-w-0">
            {collapsed ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className={cn(
                                'flex items-center w-full px-1 h-[4.1vh] rounded-md overflow-hidden',
                                'text-sm text-left',
                                'transition-colors focus-visible:ring-2 outline-hidden',
                                'hover:bg-accent/50 hover:text-foreground',
                                'active:bg-accent/50 active:text-foreground',
                                'data-[active=true]:bg-accent/50 data-[active=true]:text-foreground data-[active=true]:font-medium',
                                'data-[state=open]:hover:bg-accent/50 data-[state=open]:hover:text-foreground',
                                'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                            )}
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-8">{icon}</span>
                            <motion.span
                                animate={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2, delay: 0 }}
                                className="truncate text-sm ml-2 inline-block no-underline pointer-events-none "
                            >
                                {content}
                            </motion.span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{content}</TooltipContent>
                </Tooltip>
            ) : (
                <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className={cn(
                        'flex items-center w-full h-[4.1vh] rounded-md overflow-hidden px-1',
                        'text-sm text-left',
                        'transition-colors focus-visible:ring-2 outline-hidden',
                        'hover:bg-accent/50 hover:text-foreground',
                        'active:bg-accent/50 active:text-foreground',
                        'data-[active=true]:bg-accent/50 data-[active=true]:text-foreground data-[active=true]:font-medium',
                        'data-[state=open]:hover:bg-accent/50 data-[state=open]:hover:text-foreground',
                        'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                    )}
                >
                    <span className="flex-shrink-0 flex items-center justify-center w-8">{iconNotCollapsed}</span>
                    <motion.span
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className="truncate text-sm ml-2 inline-block no-underline pointer-events-auto"
                    >
                        {content}
                    </motion.span>
                </button>
            )}
        </li>
    );
}
