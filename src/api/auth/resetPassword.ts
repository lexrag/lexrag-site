interface ResetPasswordParams {
    email: string;
    token: string;
    new_password: string;
}

export const resetPassword = async (params: ResetPasswordParams) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json()

    if (response.ok) {
        return { success: true };
    }

    if (data?.detail) {
        return {success: false, error: data.detail || "Password reset failed"};
    } else {
        return {success: false, error: "Network error"};
    }
}
