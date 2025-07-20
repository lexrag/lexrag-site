export const getEmailChangeCode = async (email: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, error: 'No token found' };
    }

    try {
        const responseEmail = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-code-to-change-email/${email}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!responseEmail.ok) {
            return { success: false, error: 'Failed to get email change code' };
        }

        return responseEmail.json();
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get email change code' };
    }
};
