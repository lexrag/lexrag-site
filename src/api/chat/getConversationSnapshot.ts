import {v4 as uuidv4} from "uuid";

export const getConversationSnapshot = async (threadId: string) => {
    const response = await fetch(`/api/conversations/${threadId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        return [];
    }

    return data.messages.map((m) => {
        return {id: uuidv4(), content: m.data.content, direction: m.type === "human" ? "outgoing" : "incoming"}
    });
}
