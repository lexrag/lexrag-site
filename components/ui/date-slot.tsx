import { generateTimeSlots } from '@/utils/generateTimeSlots';
import { Button } from '@/components/ui/button';

interface DateSlotProps {
    selectedSlot?: string;
    onSelect: (slot: string) => void;
    disabledSlots?: string[];
    dayLabel?: string;
}

export default function DateSlot({
    selectedSlot,
    onSelect,
    disabledSlots = [],
    dayLabel = 'Friday, 20',
}: DateSlotProps) {
    const timeSlots = generateTimeSlots('09:00', '18:00');

    return (
        <div className="space-y-3">
            <div className="flex h-5 shrink-0 items-center px-3 sm:px-5 pt-4">
                <p className="text-sm font-medium">{dayLabel}</p>
            </div>
            <div className="relative w-full">
                <div
                    className="
                        grid gap-1.5
                        px-2 py-1
                        max-h-38 sm:max-h-none sm:h-60
                        overflow-y-auto
                        w-full
                        scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30
                    "
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}
                >
                    {timeSlots.map((slot) => (
                        <Button
                            key={slot}
                            data-slot="button"
                            className={`h-9 sm:h-7 rounded-md px-2 sm:px-2.5 gap-1.25 text-sm sm:text-xs w-full cursor-pointer
              ${
                  selectedSlot === slot
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-background text-accent-foreground border border-input hover:bg-accent'
              }
            `}
                            disabled={disabledSlots.includes(slot)}
                            onClick={() => onSelect(slot)}
                            variant="ghost"
                        >
                            {slot}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
