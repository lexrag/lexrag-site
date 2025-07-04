export const statusColor = {
    Paid: 'success',
    Pending: 'warning',
    Failed: 'destructive',
} as const;

export type Status = keyof typeof statusColor;
