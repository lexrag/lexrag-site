export const getLinkedinAuthLink = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin/linkedin`);
    const data = await response.json();

    if (response.ok) {
        return { success: true, redirect_url: data.auth_url };
    }

    if (data?.detail) {
        return { success: false, error: data.detail || 'LinkedIn auth failed' };
    } else {
        return { success: false, error: 'Network error' };
    }
};