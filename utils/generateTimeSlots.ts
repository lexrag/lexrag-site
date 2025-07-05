export function generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number = 30): string[] {
    const slots: string[] = [];
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const currentDate = new Date(start);

    while (currentDate <= end) {
        slots.push(currentDate.toTimeString().slice(0, 5));
        currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes);
    }

    return slots;
}
