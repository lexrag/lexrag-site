"use client";

import React, { useState } from "react";
import { useChat } from "@/api/chat/chatApi";

const ChatBox = () => {
  const { messages, sendMessage, copyToClipboard, copiedMessageId } = useChat();
  const [input, setInput] = useState<string>("");
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  const handleMouseEnter = (msgId: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredMessageId(msgId);
  };

  const handleMouseLeave = (msgId: string) => {
    const timeout = setTimeout(() => {
      setHoveredMessageId(null);
    }, 2000); // Keep icons visible for 2 seconds after hover ends

    setHoverTimeout(timeout);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="h-64 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "incoming" ? "justify-start" : "justify-end"}`}
              data-kt-element="template-out"
            >
              <div
                className={`flex flex-col ${
                  msg.type === "incoming" ? "items-start" : "items-end"
                } relative`}
                onMouseEnter={() => handleMouseEnter(msg.id)}
                onMouseLeave={() => handleMouseLeave(msg.id)}
              >
                <div
                  className={`p-5 rounded-lg text-gray-900 fw-semibold text-sm ${
                    msg.type === "incoming"
                      ? "bg-gray-200 text-left"
                      : "bg-gray-200 text-right"
                  } message-text`}
                >
                  {msg.content}
                </div>
                {/* Copy icons remain visible for 2 seconds after hover */}
                <div
                  className={`flex space-x-2 transition-opacity duration-300 ${
                    hoveredMessageId === msg.id ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <button
                    className="btn btn-sm btn-icon copy-button p-0 text-gray-500 hover:text-primary"
                    type="button"
                    aria-label="Copy"
                    onClick={() => copyToClipboard(msg.id, msg.content)}
                  >
                    <i
                      className={`ki-outline ${
                        copiedMessageId === msg.id ? "ki-copy-success" : "ki-copy"
                      } text-sm`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full space-x-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow focus:ring-0 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatBox;