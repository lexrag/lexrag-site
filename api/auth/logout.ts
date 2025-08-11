export const logout = async (): Promise<{ success: boolean; error?: string }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Logout successful: ${data.sessions_revoked} sessions revoked`);
            return { success: true };
        }

        const data = await response.json().catch(() => ({}));
        return {
            success: false,
            error: data?.detail || data?.message || 'Logout failed',
        };
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            console.error('Logout API error: CORS or Network issue:', error);
            return {
                success: false,
                error: 'CORS or network error - backend may be unavailable',
            };
        } else {
            console.error('Logout API error:', error);
            return {
                success: false,
                error: 'Network error during logout',
            };
        }
    }
};
