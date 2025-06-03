export const sendVerificationCode = async (email: string) => {
    const response = await fetch(`/api/auth/send-code/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json();

    if (response.ok) {
        const delay = Number.parseInt(process.env.NEXT_PUBLIC_VERIFICATION_CODE_TTL);
        const unlockTime = Date.now() + delay * 1000;
        localStorage.setItem("resendDisabledUntil", unlockTime.toString());
        return { success: true };
    }

    if (data?.detail) {
        return {success: false, error: data.detail || "Authentication failed"};
    } else {
        return {success: false, error: "Network error"};
    }
}
