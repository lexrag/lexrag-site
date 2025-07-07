export const updatePhoneNumber = async (phone_number: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-phone-number`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number }),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.detail || 'Unknown error');
        }
    } catch (error) {
        console.error('Error updating phone number:', error);
    }

    return null;
};
