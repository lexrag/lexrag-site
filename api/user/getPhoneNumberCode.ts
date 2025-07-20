export const getPhoneNumberCode = async (phone_number: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, error: 'No token' };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-phone-number`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, data };
        }
    } catch (error) {
        console.error('Error getting phone number code:', error);
        return { success: false, error: 'An unknown error occurred' };
    }
};