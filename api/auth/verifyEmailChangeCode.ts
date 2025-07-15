export const verifyEmailChangeCode = async (email: string, code: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-code-to-change-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ email, code: code.trim() }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.detail || 'Failed to verify email change code' };
    }

    return response.json();
};
