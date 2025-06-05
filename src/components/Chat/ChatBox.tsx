"use client";

import React, {useState, useEffect, useRef} from "react";
import {useChat} from "@/api/chat/chatApi";
import ChatTextArea from "@/components/Chat/ChatTextArea";
import {Conversation} from "@/types/Conversation";

// Helper function to render message content.
// If content is a valid JSON string with a "content" field, display that; otherwise, display the raw content.
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

const ChatBox = (props: ChatBoxProps) => {
    const {messages, sendMessage, currentResponseContent, copyToClipboard, copiedMessageId} = useChat({
        websocket: props.socket,
        setConversations: props.setConversations
    });

    const [input, setInput] = useState<string>("");
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [activeMsgType, setActiveMsgType] = useState<string>("semantic_graph");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, currentResponseContent]);

    // Handle mouse enter for copy button
    const handleMouseEnter = (msgId: string) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setHoveredMessageId(msgId);
    };

    // Handle mouse leave for copy button
    const handleMouseLeave = (msgId: string) => {
        const timeout = setTimeout(() => {
            setHoveredMessageId(null);
        }, 2000);
        setHoverTimeout(timeout);
    };

    // Toggle active message type; only one can be active at a time.
    const toggleMsgType = (type: string) => {
        setActiveMsgType((prev) => (prev === type ? null : type));
    };

    return (
        <div
            ref={chatContainerRef}
            className="flex flex-col w-full max-w-4xl mx-auto p-4"
        >
            {/* Message container */}
            <div className="flex-1 overflow-y-auto bg-transparent p-4 rounded-lg pb-[20%]">
                <div className="flex flex-col space-y-2 pb-4">
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
                                onMouseLeave={() => handleMouseLeave(msg.id)}
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
                                                if (parsed.content) {
                                                    copyText = parsed.content;
                                                }
                                            } catch (error) {
                                                // If parsing fails, use the original text
                                            }
                                            copyToClipboard(msg.id, copyText);
                                        }}
                                    >
                                        <i
                                            className={`ki-outline ${
                                                copiedMessageId === msg.id ? "ki-double-check" : "ki-copy"
                                            } text-sm`}
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/*Streaming current response*/}
                    {currentResponseContent && (
                        <div
                            className={"flex justify-start"}
                        >
                            <div
                                className={"flex flex-col items-start relative"}
                            >
                                <div
                                    className={"p-5 rounded-lg text-gray-900 text-sm message-text"}
                                >
                                    {renderMessageContent(currentResponseContent)}
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef}/>
                </div>
            </div>

            <div className="absolute bottom-[50px] left-0 w-full pr-[15%] pl-[15%] pb-2">
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
