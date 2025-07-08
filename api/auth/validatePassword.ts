export const validatePassword = async (password: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token found' };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
        });
        if (!response.ok) {
            return { success: false, error: 'Invalid password' };
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to validate password' };
    }
};
