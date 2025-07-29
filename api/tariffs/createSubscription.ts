export const createSubscription = async (tariff_id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/subscriptions/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tariff_id }),
    });

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error(responseData.detail || 'Failed to create subscription');
};
