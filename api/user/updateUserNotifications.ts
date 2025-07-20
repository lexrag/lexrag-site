export const updateUserNotifications = async (is_notifications_enabled: boolean) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const responce = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_notifications_enabled }),
    });

    if (responce.ok) {
        return true;
    }

    return false;
};
