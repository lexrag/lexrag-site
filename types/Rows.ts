export interface InputRowProps {
    label: string;
    value: string | null;
    type?: string;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    children?: React.ReactNode;
    id: string;
    onChange?: (value: string) => void;
    className?: string;
}

export interface AvatarRowProps {
    label?: string;
    url?: string;
    labelClassName?: string;
    contentClassName?: string;
    children?: React.ReactNode;
    className?: string;
    onUpload?: (url: string) => void;
}

export interface RowProps {
    label: string;
    children: React.ReactNode;
    actionIcon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    labelClassName?: string;
}
