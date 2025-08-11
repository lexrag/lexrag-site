'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { Copy, CopyCheck, Network } from 'lucide-react';
import { Message } from '@/types/Message';
import { track_message_copied, track_node_clicked } from '@/lib/analytics';
import ContentTimeTracker from '@/components/analytics/ContentTimeTracker';
import ChatTextArea from '@/components/Chat/ChatTextArea';
import { TypingAnimation } from '../magicui/typing-animation';

// Removed deprecated useSegment import

interface ChatBoxProps {
    messages: Message[];
    isThinking: boolean;
    status: string | null;
    currentResponseContent: string;
    copiedMessageId: string | null;
    sendMessage: (input: string, isNew: boolean) => void;
    copyToClipboard: (messageId: string, text: string) => void;
    handleCurrentMessage: Dispatch<SetStateAction<any>>;
    setScrollToCardId: Dispatch<SetStateAction<string>>;
    threadId?: string; // Add thread_id prop
}

const ChatBox = ({
    messages,
    isThinking,
    status,
    currentResponseContent,
    copiedMessageId,
    sendMessage,
    copyToClipboard,
    handleCurrentMessage,
    setScrollToCardId,
    threadId,
}: ChatBoxProps) => {
    const [input, setInput] = useState<string>('');
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [activeMsgType, setActiveMsgType] = useState<string | null>('semantic_graph');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    // Removed deprecated useSegment hook

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

    // TODO: test version - finish the implementation
    const handleMessageClick = (event: React.MouseEvent, msg: Message) => {
        event.preventDefault();

        const target = event.target as HTMLElement;
        const href = target.getAttribute('href');
        console.log(href);
        console.log(msg);

        function decodeExceptSpace(url: string): string {
            return url.replace(/%[0-9A-F]{2}/gi, (match) => {
                return match.toUpperCase() === '%20' ? '%20' : decodeURIComponent(match);
            });
        }

        if (target.tagName === 'A' && !!href) {
            const id = decodeExceptSpace(href);

            // Track node click event
            track_node_clicked({
                thread_id: threadId || 'unknown',
                target_id: id,
                node_type: 'message_link',
            });

            zoomToNodeGraph({ id });
            setScrollToCardId(id);
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-6xl mx-auto md:px-4 px-2 min-h-0">
            {/* Track time spent in chat - conservative defaults */}
            <ContentTimeTracker
                areaId="chat_main"
                extra={{ thread_id: threadId || 'unknown' }}
                disablePulses={true}
                minThresholdMs={3000}
                finalMinThresholdMs={5000}
                sampleOneOutOf={10}
            />

            <div className="scrollable flex-1 overflow-y-auto space-y-2 md:pb-4 pb-20 min-h-0">
                <div className="flex flex-col">
                    {messages.map((msg, i) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.direction === 'incoming' ? 'justify-start' : 'justify-end'} ${i === 0 ? 'md:pt-8 pt-4' : 'pt-0'}`}
                        >
                            <div
                                className={`flex flex-col ${
                                    msg.direction === 'incoming' ? 'items-start' : 'items-end'
                                } relative ${msg.direction !== 'incoming' ? 'max-w-[60%]' : ''}`}
                                onMouseEnter={() => handleMouseEnter(msg.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div
                                    className={`md:p-5 p-3 rounded-lg text-sm message-text ${
                                        msg.direction === 'incoming'
                                            ? 'bg-stone-100 dark:bg-stone-900 text-gray-900 dark:text-white'
                                            : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: msg.html ?? '' }}
                                    onClick={(e) => handleMessageClick(e, msg)}
                                ></div>
                                <div
                                    className={`flex space-x-2 transition-opacity duration-250 md:pt-1 pt-0.5 ${
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

                                            // Track message copy event
                                            track_message_copied({
                                                thread_id: threadId || 'unknown',
                                                message_id: msg.id,
                                            });

                                            copyToClipboard(msg.id, copyText);
                                        }}
                                    >
                                        {copiedMessageId === msg.id ? (
                                            <CopyCheck className="md:size-4 size-3" />
                                        ) : (
                                            <Copy className="md:size-4 size-3" />
                                        )}
                                    </button>
                                    {msg.direction === 'incoming' && (
                                        <button className="btn btn-xs btn-icon p-0 text-gray-500 hover:text-primary">
                                            <Network
                                                className="md:size-4 size-3"
                                                onClick={() => handleCurrentMessage(msg)}
                                            />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {currentResponseContent && (
                        <div className="flex justify-start">
                            <div className="flex flex-col items-start relative">
                                <div className="md:p-5 p-3 rounded-lg text-gray-900 text-sm message-text">
                                    {currentResponseContent}
                                </div>
                            </div>
                        </div>
                    )}

                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="flex flex-col items-start relative">
                                <div className="md:p-5 p-3 rounded-lg text-gray-900 dark:text-white text-sm message-text">
                                    <TypingAnimation className="text-sm">{status || ''}</TypingAnimation>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Desktop chat input */}
            <div className="hidden md:block mt-2 flex-shrink-0">
                <ChatTextArea
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    activeMsgType={activeMsgType}
                    toggleMsgType={toggleMsgType}
                    threadId={threadId}
                />
            </div>
        </div>
    );
};

export default ChatBox;
