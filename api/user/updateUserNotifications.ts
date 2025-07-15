import { NotificationMethod } from "@/types/User";

export const updateUserNotifications = async ( notifications: NotificationMethod ) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const responce = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/notifications`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notifications }),
    });

    if (responce.ok) {
        return true;
    }

    return false;
};