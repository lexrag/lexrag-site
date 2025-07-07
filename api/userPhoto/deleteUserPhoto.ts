export const deleteUserPhoto = async () => {
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
        return { success: true, data: null };
    } catch (error) {
        console.error(error);
    }
};
