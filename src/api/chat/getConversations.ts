"use client"

export const getConversations = async () => {
    const response = await fetch("/api/conversations/all", {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();

    if (response.ok) {
        return data.conversations;
    } else {
        return [];
    }
}
