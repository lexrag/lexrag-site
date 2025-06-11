interface VerifyEmailParams {
    email: string;
    code: string;
}

export const verifyEmail = async (params: VerifyEmailParams) => {
    const response = await fetch('${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email', {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    }

    if (data?.detail) {
        return {success: false, error: data.detail || "Email verification failed"};
    } else {
        return {success: false, error: "Network error"};
    }
}
