"use client";

import {useState, useEffect, useRef} from "react";
import {useRouter, usePathname, useParams} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {Message} from "@/types/Message";
import {MessageTypes} from "@/types/MessageTypes";
import {getConversationSnapshot} from "@/api/chat/getConversationSnapshot";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useChat = () => {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [currentResponseContent, setCurrentResponseContent] = useState<string>("");
    const currentResponseRef = useRef(currentResponseContent);
    const accumulatedContentRef = useRef("");
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const connectToWebSocket = (wsUrl: string) => {
        try {
            wsRef.current = new WebSocket(wsUrl);
        } catch (error) {
            console.error("Failed to establish WebSocket connection:", error);
            return;
        }

        const websocket = wsRef.current;

        websocket.onopen = async () => {
            console.log("WebSocket connected:", wsUrl);
            console.log(params);

            setMessages(
                await getConversationSnapshot(params.thread_id as string)
            );
        };

        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received data:", data);

                if (data.type === "event") {

                    setEvents(
                        (prev) => [...prev, data]
                    );

                }

                if (data.type === MessageTypes.token) {
                    accumulatedContentRef.current += data.content;
                    setCurrentResponseContent(accumulatedContentRef.current);
                }

                if (data.type === MessageTypes.stop) {
                    const message = {
                        ...data,
                        content: accumulatedContentRef.current,
                    };

                    setMessages((prev) => [...prev, message]);

                    accumulatedContentRef.current = "";
                    setCurrentResponseContent("");
                }

            } catch (err) {
                console.error("Failed to parse WebSocket message:", err, event.data);
            }
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        websocket.onclose = (event) => {
            console.log("WebSocket connection closed", event.reason);
            wsRef.current = null;
        };
    };

    useEffect(() => {
        currentResponseRef.current = currentResponseContent;
    }, [currentResponseContent]);

    useEffect(() => {
        if (!pathname.startsWith("/chat")) return;

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            console.error("No token found in cookies. Redirecting to sign-in.");
            router.push("/auth/signin");
            return;
        }

        if (wsRef.current) {
            console.warn("WebSocket already exists. Skipping reinitialization.");
            return;
        }

        const wsProtocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
        const wsUrl = `${wsProtocol}://${new URL(API_BASE_URL).host}/ws/chat?token=${token}`;
        const connectTimeout = setTimeout(() => connectToWebSocket(wsUrl), 500);

        return () => {
            console.log("Cleaning up WebSocket...");
            clearTimeout(connectTimeout);
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [pathname]);

    const sendMessage = (input: string, isNew: boolean) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected.");
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            {id: uuidv4(), content: input, direction: "outgoing"},
        ]);

        wsRef.current.send(JSON.stringify({type: "message", content: input, is_new: isNew, thread_id: params.thread_id}));
    };

    const copyToClipboard = (messageId: string, text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopiedMessageId(messageId);
                setTimeout(() => setCopiedMessageId(null), 2000);
            })
            .catch((err) => console.error("Failed to copy text:", err));
    };

    return {messages, events, currentResponseContent, sendMessage, copyToClipboard, copiedMessageId};
};
