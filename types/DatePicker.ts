export interface DatePickerContextType {
    value: Date | null;
    onChange: (date: Date | null) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export interface DatePickerProviderProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    children: React.ReactNode;
}

export interface DatePickerRootProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    children: React.ReactNode;
}

export interface DatePickerTriggerProps {
    placeholder?: string;
    formatString?: string;
}

export interface DatePickerContentProps {
    children: React.ReactNode;
}

export interface DatePickerLabelProps {
    children: React.ReactNode;
    className?: string;
}
