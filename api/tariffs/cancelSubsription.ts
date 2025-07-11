export const cancelSubscription = async (subscription_id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions/cancel`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subscription_id,
        }),
    });

    const data = await response.json();

    return data;
};
