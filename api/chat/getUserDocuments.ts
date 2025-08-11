export const getUserDocuments = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-documents/all`, {
        credentials: 'include',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data.documents;
    } else {
        return [];
    }
};
