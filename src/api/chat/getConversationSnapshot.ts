import {v4 as uuidv4} from "uuid";
import renderMessageMd from "@/utils/renderMessageMd";

export const getConversationSnapshot = async (threadId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${threadId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        return [];
    }

    return await Promise.all(
        data.messages.map(async (m) => ({
            id: uuidv4(),
            content: m.data.content,
            direction: m.type === "human" ? "outgoing" : "incoming",
            html: await renderMessageMd(m.data.content),
        }))
    );
}
