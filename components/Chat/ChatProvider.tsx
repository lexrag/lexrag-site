"use client";

import { createContext, useEffect, useState, useRef } from "react";


export const ChatSocketContext = createContext<WebSocket | null>(null);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) return;

      const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const protocol = base.startsWith("https") ? "wss" : "ws";
      const wsUrl = `${protocol}://${new URL(base).host}/ws/chat?token=${token}`;

      const ws = new WebSocket(wsUrl);
      setSocket(ws); // <== сохраняем socket в стейт

      ws.onopen = () => {
        console.log("WebSocket connected:", wsUrl);
        setIsReady(true);
        reconnectAttempts.current = 0;
      };

      ws.onclose = (e) => {
        console.log("WebSocket closed:", e.reason);
        setIsReady(false);
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const timeout = 1000 * 2 ** reconnectAttempts.current;
          reconnectTimeout = setTimeout(connect, timeout);
          reconnectAttempts.current += 1;
        }
      };

      ws.onerror = (e) => {
        console.log("WebSocket error", e);
        ws.close();
      };
    };

    connect();

    return () => {
      socket?.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  return (
    <ChatSocketContext.Provider value={socket}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export default ChatProvider;
