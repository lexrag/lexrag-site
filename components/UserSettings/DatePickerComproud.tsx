import React, { createContext, useContext, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import {
    DatePickerCompoundContentProps,
    DatePickerCompoundContextType,
    DatePickerCompoundLabelProps,
    DatePickerCompoundProviderProps,
    DatePickerCompoundRootProps,
    DatePickerCompoundTriggerProps,
} from '@/types/DatePicker';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined);

export function useDatePicker() {
    const ctx = useContext(DatePickerContext);
    if (!ctx) throw new Error('useDatePicker must be used within DatePicker');
    return ctx;
}

export function DatePickerProvider({ value, onChange, children }: DatePickerProviderProps) {
    const [open, setOpen] = useState(false);
    return (
        <DatePickerContext.Provider value={{ value, onChange, open, setOpen }}>{children}</DatePickerContext.Provider>
    );
}

export function DatePickerRoot({ value, onChange, children }: DatePickerRootProps) {
    return (
        <DatePickerProvider value={value} onChange={onChange}>
            <Popover>{children}</Popover>
        </DatePickerProvider>
    );
}

export function DatePickerTrigger({ placeholder, formatString = 'MMM dd yyyy' }: DatePickerCompoundTriggerProps) {
    const { value } = useDatePicker();
    return (
        <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="w-4 h-4 mr-2" />
                {value ? format(value, formatString) : <span className="text-muted-foreground">{placeholder}</span>}
            </Button>
        </PopoverTrigger>
    );
}

export function DatePickerContent({ children }: DatePickerCompoundContentProps) {
    return <PopoverContent className="p-0 w-auto min-w-[280px]">{children}</PopoverContent>;
}

export function DatePickerLabel({ children, className }: DatePickerCompoundLabelProps) {
    return <label className={className}>{children}</label>;
}

export const DatePicker = Object.assign(DatePickerRoot, {
    Trigger: DatePickerTrigger,
    Content: DatePickerContent,
    Label: DatePickerLabel,
});
