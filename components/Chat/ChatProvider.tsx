'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { getConversations } from '@/api/chat/getConversations';
import { Conversation } from '@/types/Conversation';

interface ChatContextType {
    socket: WebSocket | null;
    conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

export const ChatSocketContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
    const context = useContext(ChatSocketContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};

const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const result = await getConversations();
                setConversations(result.reverse());
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            }
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        const connectWebSocket = () => {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            if (!token) {
                console.warn('Token not found, skipping WebSocket connection');
                return;
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
            const protocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
            const host = new URL(baseUrl).host;
            const wsUrl = `${protocol}://${host}/ws/chat?token=${token}`;

            const ws = new WebSocket(wsUrl);
            setSocket(ws);

            ws.onopen = () => {
                console.log('WebSocket connected:', wsUrl);
                reconnectAttempts.current = 0;
            };

            ws.onclose = (e) => {
                console.log('WebSocket closed:', e.reason);
                attemptReconnect();
            };

            ws.onerror = (e) => {
                console.log('WebSocket error', e);
                ws.close();
            };
        };

        const attemptReconnect = () => {
            if (reconnectAttempts.current < maxReconnectAttempts) {
                const delay = 1000 * 2 ** reconnectAttempts.current;
                reconnectTimeout.current = setTimeout(connectWebSocket, delay);
                reconnectAttempts.current += 1;
            } else {
                console.error('Max WebSocket reconnect attempts reached');
            }
        };

        connectWebSocket();

        return () => {
            if (socket) socket.close();
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
    }, []);

    return (
        <ChatSocketContext.Provider value={{ socket, conversations, setConversations }}>
            {children}
        </ChatSocketContext.Provider>
    );
};

export default ChatProvider;
