export const downloadUserPhoto = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-avatars/download`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const blob = await response.blob();
        return { success: true, data: blob };
    }

    let errorMsg = 'Failed to download user photo';
    try {
        const responseData = await response.json();
        errorMsg = responseData.detail || errorMsg;
    } catch {}
    return { success: false, error: errorMsg };
};
