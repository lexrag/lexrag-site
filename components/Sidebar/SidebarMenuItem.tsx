import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarMenuItemProps {
    href: string;
    Icon: LucideIcon;
    label: string;
    disabled?: boolean;
    collapsed?: boolean;
    onOpenMobileChange?: (open: boolean) => void;
}

export function SidebarMenuItem({
    href,
    Icon,
    label,
    disabled,
    collapsed = false,
    onOpenMobileChange,
}: SidebarMenuItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    const handleClick = () => {
        if (onOpenMobileChange && typeof window !== 'undefined' && window.innerWidth < 768) {
            onOpenMobileChange(false);
        }
    };

    return (
        <li className="relative min-w-0">
            {collapsed ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={href}
                            data-active={isActive ? 'true' : undefined}
                            aria-disabled={disabled}
                            tabIndex={disabled ? -1 : 0}
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
                            title={undefined}
                            onClick={handleClick}
                        >
                            <span className="flex-shrink-0 flex items-center justify-center w-8">
                                <Icon className="size-5 text-center" />
                            </span>
                            <motion.span
                                animate={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2, delay: 0 }}
                                className="truncate text-sm ml-2 inline-block no-underline pointer-events-none "
                            >
                                {label}
                            </motion.span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
            ) : (
                <Link
                    href={href}
                    data-active={isActive ? 'true' : undefined}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
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
                    title={undefined}
                    onClick={handleClick}
                >
                    <span className="flex-shrink-0 flex items-center justify-center w-8">
                        <Icon className="size-5 text-center" />
                    </span>
                    <motion.span
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className="truncate text-sm ml-2 inline-block no-underline pointer-events-auto"
                    >
                        {label}
                    </motion.span>
                </Link>
            )}
        </li>
    );
}
