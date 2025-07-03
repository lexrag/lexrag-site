import { MenuItem } from './MenuItem';

export interface Column {
    key: string;
    label?: string;
    className?: string;
    sortable?: boolean;
    menuItems?: MenuItem[];
}
