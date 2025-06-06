"use client";

import React, {useState, useEffect, useRef} from "react";
import {useChat} from "@/api/chat/chatApi";
import ChatTextArea from "@/components/Chat/ChatTextArea";
import {Conversation} from "@/types/Conversation";

const renderMessageContent = (content: string) => {
    try {
        const parsed = JSON.parse(content);
        return parsed.content;
    } catch (e) {
        return content;
    }
};

interface ChatBoxProps {
    socket: WebSocket;
    setConversations: (conversations: Conversation[]) => void;
}

const ChatBox = ({ socket, setConversations }: ChatBoxProps) => {
    const {
        messages,
        sendMessage,
        currentResponseContent,
        copyToClipboard,
        copiedMessageId
    } = useChat({ websocket: socket, setConversations });

    const [input, setInput] = useState<string>("");
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [activeMsgType, setActiveMsgType] = useState<string>("semantic_graph");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        setActiveMsgType(prev => (prev === type ? null : type));
    };

    return (
        <div className="flex flex-col h-full w-full max-w-6xl mx-auto p-4">
            <div className="scrollable flex-1 overflow-y-auto space-y-2">
                <div className="flex flex-col pb-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.direction === "incoming" ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`flex flex-col ${
                                    msg.direction === "incoming" ? "items-start" : "items-end"
                                } relative ${msg.direction !== "incoming" ? "max-w-[60%]" : ""}`}
                                onMouseEnter={() => handleMouseEnter(msg.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    className={`p-5 rounded-lg text-gray-900 text-sm ${
                                        msg.direction === "incoming" ? "" : "bg-gray-200 text-right"
                                    } message-text`}
                                >
                                    {renderMessageContent(msg.content)}
                                </div>
                                <div
                                    className={`flex space-x-2 transition-opacity duration-250 ${
                                        hoveredMessageId === msg.id ? "opacity-100 visible" : "opacity-0 invisible"
                                    }`}
                                >
                                    <button
                                        className="btn btn-xs btn-icon p-0 text-gray-500 hover:text-primary"
                                        type="button"
                                        aria-label="Copy"
                                        onClick={() => {
                                            let copyText = msg.content;
                                            try {
                                                const parsed = JSON.parse(msg.content);
                                                if (parsed.content) copyText = parsed.content;
                                            } catch (_) {}
                                            copyToClipboard(msg.id, copyText);
                                        }}
                                    >
                                        <i
                                            className={`ki-outline ${
                                                copiedMessageId === msg.id ? "ki-double-check" : "ki-copy"
                                            } text-sm`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {currentResponseContent && (
                        <div className="flex justify-start">
                            <div className="flex flex-col items-start relative">
                                <div className="p-5 rounded-lg text-gray-900 text-sm message-text">
                                    {renderMessageContent(currentResponseContent)}
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
