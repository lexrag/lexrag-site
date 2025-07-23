"use client";

import { useEffect } from 'react';
import { useChat } from '@/api/chat/chatApi';
import { useChatContext } from '@/components/Chat/ChatProvider';


const EvaluatorClient = () => {
    const { socket } = useChatContext();
    const { messages } = useChat({ websocket: socket });


    useEffect(() => {
        console.log(socket);
        console.log(messages);
    }, [socket, messages]);


    const onStartClick = (socket: WebSocket | null) => {
        if (!socket) return;
        socket.send('{}')
    }

    return (
        <button onClick={() => onStartClick(socket)}>Start</button>
    )
};

export default EvaluatorClient;
