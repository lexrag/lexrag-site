const deleteUserDocument = async (uri: string): Promise<object> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-documents/delete?uri=${uri}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, detail: data.detail };
    } else {
        return { success: true, ...data };
    }
};

export default deleteUserDocument;
