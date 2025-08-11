export const gdprEmailExport = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/legal/gdpr-export`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        return true;
    }

    return false;
};
