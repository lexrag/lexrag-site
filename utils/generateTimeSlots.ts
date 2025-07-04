export const generateTimeSlots = (
    startTime: string = '09:00',
    endTime: string = '24:00',
    intervalMinutes: number = 30,
) => {
    const slots: string[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let currentDate = new Date();
    currentDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    while (currentDate <= endDate) {
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        slots.push(`${hours}:${minutes}`);
        currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes);
    }

    return slots;
};
