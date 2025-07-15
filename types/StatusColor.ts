export const statusColor = {
    succeeded: 'success',
    pending: 'warning',
    failed: 'destructive',
} as const;

export type Status = keyof typeof statusColor;
