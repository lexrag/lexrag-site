import { IconType } from 'react-icons';

export interface MenuItem {
    icon: IconType;
    label: string;
    onClick?: () => void;
    items?: MenuItem[];
}
