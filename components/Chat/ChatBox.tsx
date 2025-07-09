'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useChat } from '@/api/chat/chatApi';
import { Copy, CopyCheck, Network } from 'lucide-react';
import { Conversation } from '@/types/Conversation';
import ChatTextArea from '@/components/Chat/ChatTextArea';
import BouncingBall from './BouncingBall';

interface ChatBoxProps {
    socket: WebSocket;
    setConversations: Dispatch<SetStateAction<Conversation[]>>;
}

const ChatBox = ({ socket, setConversations }: ChatBoxProps) => {
    const { messages, isThinking, sendMessage, currentResponseContent, copyToClipboard, copiedMessageId } = useChat({
        websocket: socket,
        setConversations,
    });

    const [input, setInput] = useState<string>('');
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [activeMsgType, setActiveMsgType] = useState<string | null>('semantic_graph');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentResponseContent]);

    const handleMouseEnter = (msgId: string) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setHoveredMessageId(msgId);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setHoveredMessageId(null);
        }, 2000);
        setHoverTimeout(timeout);
    };

    const toggleMsgType = (type: string) => {
        setActiveMsgType((prev) => (prev === type ? null : type));
    };

    return (
        <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-4">
            <div className="scrollable flex-1 overflow-y-auto space-y-2">
                <div className="flex flex-col">
                    {messages.map((msg, i) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.direction === 'incoming' ? 'justify-start' : 'justify-end'} ${i === 0 ? 'pt-8' : 'pt-0'}`}
                        >
                            <div
                                className={`flex flex-col ${
                                    msg.direction === 'incoming' ? 'items-start' : 'items-end'
                                } relative ${msg.direction !== 'incoming' ? 'max-w-[60%]' : ''}`}
                                onMouseEnter={() => handleMouseEnter(msg.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    className={`p-5 rounded-lg text-sm message-text ${
                                        msg.direction === 'incoming'
                                            ? 'bg-stone-100 dark:bg-stone-900 text-gray-900 dark:text-white'
                                            : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: msg.html ?? '' }}
                                ></div>
                                <div
                                    className={`flex space-x-2 transition-opacity duration-250 pt-1 ${
                                        hoveredMessageId === msg.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                >
                                    <button
                                        className="btn btn-xs btn-icon p-0 text-gray-500 hover:text-primary"
                                        onClick={() => {
                                            let copyText = msg.content;
                                            try {
                                                const parsed = JSON.parse(msg.content);
                                                if (parsed.content) copyText = parsed.content;
                                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                            } catch (_) {}
                                            copyToClipboard(msg.id, copyText);
                                        }}
                                    >
                                        {copiedMessageId === msg.id ? (
                                            <CopyCheck className="size-4" />
                                        ) : (
                                            <Copy className="size-4" />
                                        )}
                                    </button>
                                    {msg.direction === 'incoming' && (
                                        <button className="btn btn-xs btn-icon p-0 text-gray-500 hover:text-primary">
                                            <Network className="size-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {currentResponseContent && (
                        <div className="flex justify-start">
                            <div className="flex flex-col items-start relative">
                                <div className="p-5 rounded-lg text-gray-900 text-sm message-text">
                                    {currentResponseContent}
                                </div>
                            </div>
                        </div>
                    )}

                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="flex flex-col items-start relative">
                                <div className="p-5 rounded-lg text-gray-900 text-sm message-text">
                                    <BouncingBall />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="mt-2">
                <ChatTextArea
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    activeMsgType={activeMsgType}
                    toggleMsgType={toggleMsgType}
                />
            </div>
        </div>
    );
};

export default ChatBox;
