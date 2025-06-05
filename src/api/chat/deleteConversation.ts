const deleteConversation = async (threadId: string): Promise<object> => {
    const response = await fetch(`/api/conversations/${threadId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        return {"success": false, "detail": data.detail}
    } else {
        return {"success": true, ...data}
    }
}

export default deleteConversation;
