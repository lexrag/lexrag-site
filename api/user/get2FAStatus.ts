export const get2FAStatus = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/twofactor/status`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    }

    return { success: false, error: 'Failed to get 2FA status' };
};
