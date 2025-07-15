import { LucideIcon } from 'lucide-react';

export interface MenuItem {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    items?: MenuItem[];
}
