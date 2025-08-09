export const getCurrentSubscription = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/subscriptions/any`, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status === 401) {
            throw new Error('401 Unauthorized');
        } else {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch subscription');
        }
    } catch (error) {
        if (error instanceof Error && !error.message.includes('401')) {
            console.error('Error in getCurrentSubscription:', error);
        }
        throw error;
    }
};
