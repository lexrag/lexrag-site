import { useState } from 'react';
import { generateYears } from '@/utils/generateTimeSlots';
import DateSlot from '@/components/ui/date-slot';

interface YearPickerProps {
    value?: string;
    onChange?: (year: string) => void;
}

const YearPicker = ({ value, onChange }: YearPickerProps) => {
    const years = generateYears();
    const [selectedYear, setSelectedYear] = useState<string | undefined>(value);

    const handleSelect = (year: string) => {
        setSelectedYear(year);
        if (onChange) onChange(year);
    };

    return (
        <div className="w-full">
            <DateSlot
                selectedSlot={selectedYear}
                onSelect={handleSelect}
                disabledSlots={[]}
                dayLabel={'Select year'}
                timeSlots={years.map(String)}
            />
        </div>
    );
};

export default YearPicker;
