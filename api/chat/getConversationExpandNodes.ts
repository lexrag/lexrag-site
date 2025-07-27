export const getConversationExpandNodes = async (nodeId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/expand-nodes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            node_id: nodeId,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Error expanding nodes:', response.status, data);
        return { neighbors: [], links: [] };
    }

    return data;
};
