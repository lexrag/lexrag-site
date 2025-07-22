import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarMenuItemProps {
    href: string;
    Icon: LucideIcon;
    label: string;
    disabled?: boolean;
}

export function SidebarMenuItem({ href, Icon, label, disabled }: SidebarMenuItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li className="relative min-w-0">
            <Link
                href={href}
                data-active={isActive ? 'true' : undefined}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                    // Layout & responsiveness
                    'flex items-center gap-2 w-full min-w-0 flex-1 p-2 py-2 h-[4.1vh] rounded-md overflow-hidden',
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
                )}
            >
                <Icon className="size-4" />
                <span className="truncate min-w-0 flex-1 text-sm">{label}</span>
            </Link>
        </li>
    );
}
