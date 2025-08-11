const renameConversation = async (threadId: string, newTitle: string): Promise<object> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${threadId}/rename`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newTitle }),
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, detail: data.detail };
    } else {
        return { success: true, ...data };
    }
};

export default renameConversation;
