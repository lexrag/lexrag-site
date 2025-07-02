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
}

export interface UserSettingsAvatarRowProps {
    label?: string;
    url?: string;
    labelClassName?: string;
    contentClassName?: string;
    children?: React.ReactNode;
}

export interface RowProps {
    label: string;
    children: React.ReactNode;
    actionIcon?: React.ReactNode;
}
