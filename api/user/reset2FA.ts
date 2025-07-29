export const reset2FA = async (user_email: string, reset_otp_code: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/2fa/reset`, {
        body: JSON.stringify({
            user_email,
            reset_otp_code,
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
};

export default reset2FA;
