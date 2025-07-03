import { IconType } from 'react-icons';

export interface InputRowProps {
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    children?: React.ReactNode;
    id: string;
    onChange?: (value: string) => void;
    className?: string;
}

export interface UserSettingsAvatarRowProps {
    label?: string;
    url?: string;
    labelClassName?: string;
    contentClassName?: string;
    children?: React.ReactNode;
    className?: string;
}

export interface RowProps {
    label: string;
    children: React.ReactNode;
    actionIcon?: IconType | React.ReactNode;
    onClick?: () => void;
}
