'use client';

export const getConversations = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/all`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data.conversations;
    } else {
        return [];
    }
};
