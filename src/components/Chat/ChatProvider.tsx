"use client";

import { createContext, useEffect, useState } from "react";

export const ChatSocketContext = createContext<WebSocket | null>(null);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) return;

        const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const protocol = base.startsWith("https") ? "wss" : "ws";
        const wsUrl = `${protocol}://${new URL(base).host}/ws/chat?token=${token}`;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("WebSocket connected:", wsUrl);
            setSocket(ws);
            setReady(true);
        };

        ws.onclose = (e) => {
            console.log("WebSocket closed:", e.reason);
        };

        return () => ws.close();
    }, []);

    if (!ready) return null;

    return (
        <ChatSocketContext.Provider value={socket}>
            {children}
        </ChatSocketContext.Provider>
    );
};

export default ChatProvider;
