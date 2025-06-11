export const getGoogleAuthLink = async () => {
    const response = await fetch('/api/auth/signin/google', {credentials: "include",})
    const data = await response.json()

    if (response.ok) {
        return { success: true, redirect_url: data.redirect_url };
    }

    if (data?.detail) {
        return {success: false, error: data.detail || "Email verification failed"};
    } else {
        return {success: false, error: "Network error"};
    }
}
