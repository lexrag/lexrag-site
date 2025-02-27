"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  content: string;
  type: "incoming" | "outgoing";
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/chat") return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.error("No token found in cookies. Redirecting to sign-in.");
      localStorage.setItem("redirectAfterLogin", "/chat");
      router.push("/auth/signin");
      return;
    }

    if (wsRef.current) {
      console.warn("WebSocket already exists. Skipping reinitialization.");
      return;
    }

    const wsProtocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://${new URL(API_BASE_URL).host}/ws/chat`;

    console.log("🟢 WebSocket URL:", wsUrl);

    const connectWebSocket = () => {
      try {
        const websocket = new WebSocket(wsUrl);
        wsRef.current = websocket;

        websocket.onopen = () => {
          console.log("✅ WebSocket connected:", wsUrl);
          websocket.send(JSON.stringify({ type: "auth", token }));
        };

        websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === "error" && data.message === "Unauthorized") {
              console.error("❌ Unauthorized WebSocket access. Redirecting to sign-in.");
              document.cookie = "token=; Path=/; Max-Age=0";
              localStorage.setItem("redirectAfterLogin", "/chat");
              router.push("/auth/signin");
              websocket.close();
              wsRef.current = null;
              return;
            }

            if (data.type === "assistant_response") {
              setMessages((prevMessages) => [
                ...prevMessages,
                { id: uuidv4(), content: data.content, type: "incoming" },
              ]);
            }
          } catch (err) {
            console.error("⚠️ Failed to parse WebSocket message:", err, event.data);
          }
        };

        websocket.onerror = (error) => {
          console.error("⚠️ WebSocket error:", error);
        };

        websocket.onclose = (event) => {
          console.log("🔌 WebSocket connection closed", event.reason);
          wsRef.current = null;
        };
      } catch (error) {
        console.error("❌ Failed to establish WebSocket connection:", error);
      }
    };

    const connectTimeout = setTimeout(connectWebSocket, 500);

    return () => {
      console.log("🛑 Cleaning up WebSocket...");
      clearTimeout(connectTimeout);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [pathname]);

  const sendMessage = (input: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("⚠️ WebSocket is not connected.");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), content: input, type: "outgoing" },
    ]);

    wsRef.current.send(JSON.stringify({ type: "message", content: input }));
  };

  const copyToClipboard = (messageId: string, text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      })
      .catch((err) => console.error("⚠️ Failed to copy text:", err));
  };

  return { messages, sendMessage, copyToClipboard, copiedMessageId };
};