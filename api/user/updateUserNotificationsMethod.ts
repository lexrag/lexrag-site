import { NotificationMethod } from '@/types/User';

export const updateUserNotificationsMethod = async (notifications_method: NotificationMethod) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notifications_method }),
    });

    if (response.ok) {
        return true;
    }

    return false;
};
