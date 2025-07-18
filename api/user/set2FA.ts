export const setTwoFactor = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, error: 'No token' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/twofactor/set-two-factor`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    }

    return { success: false, error: 'Failed to set 2FA' };
};
