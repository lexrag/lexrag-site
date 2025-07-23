import React from 'react';
import {
    CreditCard,
    History,
    Home,
    MessageSquare,
    ReceiptText,
    Settings,
    Shield,
    ShieldCheck,
    Sparkles,
    User,
} from 'lucide-react';
import { SidebarMenuGroup } from './SidebarMenuGroup';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarThemeSwitch } from './SidebarThemeSwitch';

interface SidebarMenuProps {
    collapsed?: boolean;
    onOpenMobileChange?: (open: boolean) => void;
}

const menuItems = [
    {
        group: 'Home',
        items: [
            { href: '/', Icon: Home, label: 'Home' },
            { href: '/features', Icon: Sparkles, label: 'Features' },
            { href: '/chat/new', Icon: MessageSquare, label: 'Chat' },
        ],
    },
    {
        group: 'Profile',
        items: [
            { href: '/profile', Icon: User, label: 'Profile' },
            { href: '/profile/security', Icon: Shield, label: 'Security' },
            { href: '/profile/security/sessions', Icon: History, label: 'Sessions' },
            { href: '/profile/compliance', Icon: ShieldCheck, label: 'Compliance' },
        ],
    },
    {
        group: 'Invoices',
        items: [
            { href: '/profile/billing', Icon: CreditCard, label: 'Billing' },
            { href: '/profile/billing/plans', Icon: ReceiptText, label: 'Plans' },
            { href: '/profile/billing/history', Icon: History, label: 'Payments' },
        ],
    },
    {
        group: 'Settings',
        items: [{ href: '/profile/settings', Icon: Settings, label: 'Settings' }, { isThemeSwitch: true }],
    },
];

export function SidebarMenu({ collapsed = false, onOpenMobileChange }: SidebarMenuProps) {
    return (
        <nav className="px-2 pb-2">
            <ul className="flex flex-col gap-2">
                {menuItems.map((group) => (
                    <SidebarMenuGroup key={group.group} label={group.group} collapsed={collapsed}>
                        {group.items.map((item, idx) =>
                            item.isThemeSwitch ? (
                                <SidebarThemeSwitch key={`theme-${group.group}-${idx}`} collapsed={collapsed} />
                            ) : item.Icon && item.href && item.label ? (
                                <SidebarMenuItem
                                    key={item.href}
                                    href={item.href}
                                    Icon={item.Icon}
                                    label={item.label}
                                    collapsed={collapsed}
                                    onOpenMobileChange={onOpenMobileChange}
                                />
                            ) : null,
                        )}
                    </SidebarMenuGroup>
                ))}
            </ul>
        </nav>
    );
}
