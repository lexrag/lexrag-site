export const enable2FA = async (otp_code: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, error: 'No token' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/2fa/enable`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp_code }),
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    }

    return { success: false, error: 'Failed to enable 2FA' };
};
