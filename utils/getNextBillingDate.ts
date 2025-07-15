import { formatDateMonth } from "./formatDate";

export const getNextBillingDate = (created_at: string, duration: number) => {
    return formatDateMonth(
        new Date(new Date(created_at).getTime() + duration * 30 * 24 * 60 * 60 * 1000).toISOString()
    );
};  