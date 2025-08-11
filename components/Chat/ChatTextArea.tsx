import React from 'react';
import { usePathname } from 'next/navigation';
import { track_question_submitted } from '@/lib/analytics';
import ContentTimeTracker from '@/components/analytics/ContentTimeTracker';
import ChatTextAreaBottomMenu from '@/components/Chat/ChatTextAreaBottomMenu';

export interface ChatTextAreaProps {
    input: string;
    setInput: (text: string) => void;
    sendMessage: (message: string, isNew: boolean) => void;
    activeMsgType: string | null;
    toggleMsgType: (msgType: string) => void;
    threadId?: string; // Add thread_id prop
}

const ChatTextArea = ({ input, setInput, sendMessage, activeMsgType, toggleMsgType, threadId }: ChatTextAreaProps) => {
    const pathname = usePathname();
    const isNewConversation = pathname.includes('/new');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (input.trim()) {
                const questionLength = input.trim().length;
                // const wordCount = input.trim().split(/\s+/).length;
                // const complexity = questionLength > 200 ? 'high' : questionLength > 100 ? 'medium' : 'low';

                try {
                    track_question_submitted({
                        thread_id: threadId || pathname.split('/').pop() || 'new',
                        length: questionLength,
                        has_files: false, // TODO: Add file detection logic
                    });
                } catch (error) {
                    console.error('Error tracking question submitted:', error);
                }
            }

            sendMessage(input, isNewConversation);
            setInput('');
        }
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);

        const textarea = e.target;
        const siblingHeight = textarea.nextElementSibling?.scrollHeight || 0;

        textarea.rows = 2;
        textarea.parentElement!.style.height = 'auto';

        const newHeight = Math.min(textarea.scrollHeight + siblingHeight, 7 * 30 + siblingHeight);

        textarea.parentElement!.style.height = `${newHeight}px`;
    };

    return (
        <div className="flex flex-col w-full mt-2 md:p-3 p-2 rounded-md border bg-background border-border hover:shadow-lg transition-shadow min-h-[72px] md:min-h-[72px] min-h-[60px] flex-shrink-0 chat-input-container">
            {/* Track time spent in chat input - pulses enabled with longer interval */}
            <ContentTimeTracker
                areaId="chat_input"
                extra={{
                    thread_id: threadId || pathname.split('/').pop() || 'unknown',
                    is_new_conversation: isNewConversation,
                }}
                disablePulses={false}
                pulseIntervalMs={300000}
            />

            <textarea
                className="flex-1 w-full md:p-3 p-2 bg-transparent text-foreground 
                   focus:ring-0 focus:outline-none overflow-y-auto resize-none 
                   h-[50px] placeholder:text-muted-foreground text-[16px]"
                value={input}
                onChange={handleTextAreaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
            />

            <ChatTextAreaBottomMenu
                input={input}
                setInput={setInput}
                activeMsgType={activeMsgType}
                toggleMsgType={toggleMsgType}
                sendMessage={sendMessage}
                isNewConversation={isNewConversation}
            />
        </div>
    );
};

export default ChatTextArea;
