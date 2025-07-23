import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            <Link
                href={href}
                data-active={isActive ? 'true' : undefined}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                    // Layout & responsiveness
                    'flex items-center w-full p-2 py-2 h-[4.1vh] rounded-md overflow-hidden',
                    // Typography
                    'text-sm text-left',
                    // State & interaction
                    'transition-colors focus-visible:ring-2 outline-hidden',
                    'hover:bg-accent/50 hover:text-foreground',
                    'active:bg-accent/50 active:text-foreground',
                    // Data attributes
                    'data-[active=true]:bg-accent/50 data-[active=true]:text-foreground data-[active=true]:font-medium',
                    'data-[state=open]:hover:bg-accent/50 data-[state=open]:hover:text-foreground',
                    // Disabled
                    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
                    // завжди justify-start
                )}
                title={collapsed ? label : undefined}
                onClick={handleClick}
            >
                <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 32 }}>
                    <Icon className="size-5" />
                </span>
                <motion.span
                    animate={collapsed ? { opacity: 0, x: -16 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: collapsed ? 0 : 0.2 }}
                    className="truncate text-sm ml-2"
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                        pointerEvents: collapsed ? 'none' : 'auto',
                    }}
                >
                    {label}
                </motion.span>
            </Link>
        </li>
    );
}
