interface UpdateUserParams {
    first_name: string;
    last_name: string;
    phone_number?: string;
    email: string;
}

export const updateUser = async (data: UpdateUserParams) => {
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
        body: JSON.stringify(data),
    });
    console.log(response);
    const responseData = await response.json();

    if (response.ok) {
        return { success: true };
    }

    return { success: false, error: responseData.detail || 'Failed to update user' };
};
