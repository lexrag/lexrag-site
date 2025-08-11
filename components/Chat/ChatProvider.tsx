'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { getConversations } from '@/api/chat/getConversations';
import { Conversation } from '@/types/Conversation';
import { UserDocuments } from '@/types/UserDocuments';

interface ChatContextType {
    socket: WebSocket | null;
    conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    connectionError: string | null;
    userDocuments: UserDocuments[];
    setUserDocuments: React.Dispatch<React.SetStateAction<UserDocuments[]>>;
    selectedUserDocuments: string[];
    setSelectedUserDocuments: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatSocketContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
    const context = useContext(ChatSocketContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};

interface ChatProviderProps {
    mode: 'chat' | 'evaluator';
    children: ReactNode;
}

const ChatProvider = ({ mode, children }: ChatProviderProps) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [userDocuments, setUserDocuments] = useState<UserDocuments[]>([]);
    const [selectedUserDocuments, setSelectedUserDocuments] = useState<string[]>([]);
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
    }, []); // Empty dependency array is intentional - only run once on mount

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
            const wsUrl = `${protocol}://${host}/ws/${mode}?token=${token}`;

            const ws = new WebSocket(wsUrl);
            setSocket(ws);

            ws.onopen = () => {
                console.log('WebSocket connected:', wsUrl);
                reconnectAttempts.current = 0;
                setConnectionError(null);
            };

            ws.onclose = (e) => {
                console.log('WebSocket closed:', e.reason);
                if (e.reason) {
                    setConnectionError(`Connection closed: ${e.reason}`);
                }
                attemptReconnect();
            };

            ws.onerror = (e) => {
                console.log('WebSocket error', e);
                setConnectionError('WebSocket connection error');
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
                setConnectionError('Failed to connect after multiple attempts');
            }
        };

        connectWebSocket();

        return () => {
            if (socket) socket.close();
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array is intentional - only run once on mount

    return (
        <ChatSocketContext.Provider
            value={{
                socket,
                conversations,
                setConversations,
                connectionError,
                userDocuments,
                setUserDocuments,
                selectedUserDocuments,
                setSelectedUserDocuments,
            }}
        >
            {children}
        </ChatSocketContext.Provider>
    );
};

export default ChatProvider;
