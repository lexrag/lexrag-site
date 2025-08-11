import { formatDateMonth } from './formatDate';

export const getNextBillingDate = (created_at: string, duration: number) => {
    if (!created_at || created_at === '') {
        return 'N/A';
    }

    try {
        const createdDate = new Date(created_at);

        if (isNaN(createdDate.getTime())) {
            return 'N/A';
        }

        const nextBillingDate = new Date(createdDate.getTime() + duration * 30 * 24 * 60 * 60 * 1000);

        if (isNaN(nextBillingDate.getTime())) {
            return 'N/A';
        }

        return formatDateMonth(nextBillingDate.toISOString());
    } catch (error) {
        console.error('Error calculating next billing date:', error);
        return 'N/A';
    }
};
