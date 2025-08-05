export const uploadUserDocuments = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-documents/upload`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        return {};
    }
};
