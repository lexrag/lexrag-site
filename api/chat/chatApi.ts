import {useEffect, useMemo, useRef, useState} from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/Message";
import { MessageTypes } from "@/types/MessageTypes";
import { getConversationSnapshot } from "@/api/chat/getConversationSnapshot";
import eventHandler from "@/api/chat/eventHandler";
import { Conversation } from "@/types/Conversation";
import renderMessageMd from "@/utils/renderMessageMd";

interface UseChatArgs {
  websocket: WebSocket | null;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

export const useChat = ({ websocket, setConversations }: UseChatArgs) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentResponseContent, setCurrentResponseContent] = useState<string>("");
    const currentResponseRef = useRef(currentResponseContent);
    const accumulatedContentRef = useRef("");
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const pathname = usePathname();

    const threadId = useMemo(() => {
        const match = pathname.match(/^\/chat\/([^\/]+)/);
        return match ? match[1] : null;
    }, [pathname]);

    useEffect(() => {
        currentResponseRef.current = currentResponseContent;
    }, [currentResponseContent]);

    useEffect(() => {
        if (currentResponseContent !== "") {
            setCurrentResponseContent("");
        }
    }, [messages]);

    useEffect(() => {
        if (!websocket) return;
        if (!pathname.startsWith("/chat")) return;

        const handleMessage = async (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            if (data.type === "event") {
                await eventHandler(data, { setConversations });
            }

            if (data.type === MessageTypes.token) {
                accumulatedContentRef.current += data.content;
                setCurrentResponseContent(accumulatedContentRef.current);
            }

            if (data.type === MessageTypes.stop) {
                const html = await renderMessageMd(accumulatedContentRef.current);

                const message = {
                    ...data,
                    html,
                    content: accumulatedContentRef.current,
                };

                setMessages((prev) => [...prev, message]);
                accumulatedContentRef.current = "";
            }
        };

        websocket.onmessage = async (event: MessageEvent) => {
            await handleMessage(event);
        }

        if (threadId !== "new") {
            getConversationSnapshot(threadId as string).then(setMessages);
        }

        return () => websocket.removeEventListener("message", handleMessage);
    }, [websocket, pathname]);

    const sendMessage = (input: string, isNew: boolean) => {
        if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

        setMessages((prev) => [
            ...prev,
            { id: uuidv4(), content: input, direction: "outgoing", html: input },
        ]);

        websocket.send(JSON.stringify({
            type: "message",
            content: input,
            is_new: isNew,
            thread_id: threadId,
        }));
    };

    const copyToClipboard = (messageId: string, text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        });
    };

    return { messages, currentResponseContent, sendMessage, copyToClipboard, copiedMessageId };
};
