"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/api/chat/chatApi";

const ChatBox = () => {
  const { messages, sendMessage, copyToClipboard, copiedMessageId } = useChat();
  const [input, setInput] = useState<string>("");
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Авто-скролл вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Обновление высоты чата при изменении размеров окна
  useEffect(() => {
    const updateChatHeight = () => {
      if (chatContainerRef.current) {
        const headerHeight = document.querySelector("header")?.clientHeight || 0;
        chatContainerRef.current.style.height = `calc(100vh - ${headerHeight}px)`;
      }
    };

    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);
    return () => window.removeEventListener("resize", updateChatHeight);
  }, []);

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
    }, 2000);
    setHoverTimeout(timeout);
  };

  return (
    <div ref={chatContainerRef} className="flex flex-col w-full max-w-4xl mx-auto p-4">
      {/* Окно сообщений с прозрачным фоном */}
      <div className="flex-1 overflow-hidden bg-transparent p-4 rounded-lg">
        <div className="h-full overflow-y-auto flex flex-col space-y-2 pb-4">
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
                  className={`p-5 rounded-lg text-gray-900 text-sm ${
                    msg.type === "incoming" ? "bg-gray-200 text-left" : "bg-gray-200 text-right"
                  } message-text`}
                >
                  {msg.content}
                </div>
                {/* Кнопка копирования остается видимой 2 сек после ухода курсора */}
                <div
                  className={`flex space-x-2 transition-opacity duration-300 ${
                    hoveredMessageId === msg.id ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <button
                    className="btn btn-sm btn-icon p-0 text-gray-500 hover:text-primary"
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
          {/* Невидимый div для авто-скролла вниз */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода */}
      <div className="flex w-full space-x-2 mt-2">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow focus:ring-0 focus:outline-none"
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