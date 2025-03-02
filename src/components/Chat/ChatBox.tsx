"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/api/chat/chatApi";

// Helper function to render message content.
// If content is a valid JSON string with a "content" field, display that; otherwise, display the raw content.
const renderMessageContent = (content: string) => {
  try {
    const parsed = JSON.parse(content);
    return parsed.content || content;
  } catch (e) {
    return content;
  }
};

const ChatBox = () => {
  // Chat state hooks
  const { messages, sendMessage, copyToClipboard, copiedMessageId } = useChat();
  const [input, setInput] = useState<string>("");
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  // Default active message type is "semantic_graph"
  const [activeMsgType, setActiveMsgType] = useState<string>("semantic_graph");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  // Log activeMsgType changes once via useEffect
  useEffect(() => {
    console.log("Active msg_type changed to:", activeMsgType || "none");
  }, [activeMsgType]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update header height on window resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.clientHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Handle sending messages when the user presses Enter.
  // Since sendMessage expects a string, we send the JSON stringified object.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Determine message type; if none is active, default to "semantic_graph"
      const msgTypeToSend = activeMsgType || "semantic_graph";
      // Send message as a JSON string containing both content and msg_type.
      sendMessage(JSON.stringify({ content: input, msg_type: msgTypeToSend }));
      setInput("");
    }
  };

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
      style={{ paddingTop: `${headerHeight}px`, height: `calc(102vh - ${headerHeight}px)` }}
    >
      {/* Message container */}
      <div className="flex-1 overflow-y-auto bg-transparent p-4 rounded-lg">
        <div className="flex flex-col space-y-2 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "incoming" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex flex-col ${
                  msg.type === "incoming" ? "items-start" : "items-end"
                } relative ${msg.type !== "incoming" ? "max-w-[60%]" : ""}`}
                onMouseEnter={() => handleMouseEnter(msg.id)}
                onMouseLeave={() => handleMouseLeave(msg.id)}
              >
                <div
                  className={`p-5 rounded-lg text-gray-900 text-sm ${
                    msg.type === "incoming" ? "" : "bg-gray-200 text-right"
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Card container for the input and icon buttons */}
      <div className="flex flex-col w-full mt-2 p-3 border border-gray-300 rounded-2xl hover:shadow-lg transition-shadow">
        {/* Textarea input field remains unchanged */}
        <textarea
          className="flex-1 w-full p-3 bg-transparent focus:ring-0 focus:outline-none overflow-y-auto resize-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Reset height to allow shrinking when text is removed.
            e.target.style.height = "auto";
            // Calculate new height, limiting to 5 rows (assume a line height of 24px)
            const newHeight = Math.min(e.target.scrollHeight, 5 * 24);
            e.target.style.height = `${newHeight}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
        />
        {/* Container for icon buttons with tooltips and toggle functionality */}
        <div className="relative flex space-x-1 mt-2">
          {/* Group wrapper for Semantic Graph button */}
          <div className="group relative">
            <button
              type="button"
              className={`btn btn-xs btn-icon p-0 ${
                activeMsgType === "semantic_graph"
                  ? "text-sky-700 dark:text-sky-300"
                  : "text-gray-400 hover:text-primary"
              } rounded`}
              aria-label="Semantic Graph"
              onClick={() => toggleMsgType("semantic_graph")}
            >
              <i className="ki-duotone ki-data text-xs"></i>
            </button>
            {/* Tooltip displayed below the button */}
            <div
              className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-28 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal"
            >
              Semantic Graph
            </div>
          </div>
          {/* Group wrapper for Legal Breakdown button */}
          <div className="group relative">
            <button
              type="button"
              className={`btn btn-xs btn-icon p-0 ${
                activeMsgType === "legal_breakdown"
                  ? "text-sky-700 dark:text-sky-300"
                  : "text-gray-400 hover:text-primary"
              } rounded`}
              aria-label="Legal Breakdown"
              onClick={() => toggleMsgType("legal_breakdown")}
            >
              <i className="ki-duotone ki-abstract-14 text-xs"></i>
            </button>
            {/* Tooltip displayed below the button */}
            <div
              className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-32 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal"
            >
              Legal Breakdown
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;