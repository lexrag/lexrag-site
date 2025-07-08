export const updateUserPhoto = async (photo: FormData) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-avatars/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();
            console.error(errorData);
        }
    } catch (error) {
        console.error(error);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-avatars/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    });
    const responseData = await response.json();

    if (response.ok) {
        return { success: true, data: responseData };
    }

    return { success: false, error: responseData.detail || 'Failed to update user photo' };
};
