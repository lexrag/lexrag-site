export function formatDate(date: Date) {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
}

export function formatDateMonth(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}
