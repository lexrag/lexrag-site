export const changePassword = async (old_password: string, new_password: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password, new_password }),
    });

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    }

    return { success: false, error: data.detail || 'Password change failed' };
};
