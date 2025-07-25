import { LucideIcon } from 'lucide-react';

export interface MenuItem {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    items?: MenuItem[];
}

export interface SidebarMenuItem {
    href: string;
    Icon: LucideIcon;
    label: string;
    isThemeSwitch?: boolean;
}

export interface SidebarMenuGroup {
    group: string;
    items: SidebarMenuItem[];
}
