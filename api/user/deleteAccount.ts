export const deleteAccount = async (password: string): Promise<{ success: boolean; error?: string }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/legal/delete-account`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
    });

    if (response.ok) {
        return { success: true };
    } else {
        let error = 'Unknown error';
        try {
            const data = await response.json();
            error = data.detail || error;
        } catch {}
        return { success: false, error };
    }
};