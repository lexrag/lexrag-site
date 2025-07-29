export const cancelSubscription = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/subscriptions/cancel`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error(responseData.detail || 'Failed to cancel subscription');
};
