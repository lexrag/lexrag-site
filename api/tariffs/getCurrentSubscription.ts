export const getCurrentSubscription = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/subscriptions/any`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getCurrentSubscription:', error);
        throw error;
    }
};
