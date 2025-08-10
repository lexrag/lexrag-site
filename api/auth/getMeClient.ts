'use client';

export const getMeClient = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            return null;
        }
    } catch (error) {
        if (error instanceof Error && !error.message.includes('401')) {
            console.error('Error fetching /auth/me:', error);
        }
    }

    return null;
};
