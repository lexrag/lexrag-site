import { PaymentHistoryResponse } from '@/types/PlansTable';

export const getPaymentHistory = async ({
    page = 1,
    per_page = 10,
    status = null as string | null | undefined,
    payment_method = null as string | null | undefined,
    start_date = null,
    end_date = null,
}: {
    page?: number;
    per_page?: number;
    status?: string | null;
    payment_method?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}): Promise<PaymentHistoryResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
    });

    if (status) params.append('status', status);
    if (payment_method) params.append('payment_method', payment_method);
    if (start_date) params.append('start_date', start_date);
    if (end_date) params.append('end_date', end_date);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment-history/?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};
