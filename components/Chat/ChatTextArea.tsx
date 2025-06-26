import React from 'react';
import { usePathname } from 'next/navigation';
import ChatTextAreaBottomMenu from '@/components/Chat/ChatTextAreaBottomMenu';

export interface ChatTextAreaProps {
    input: string;
    setInput: (text: string) => void;
    sendMessage: (message: string, isNew: boolean) => void;
    activeMsgType: string | null;
    toggleMsgType: (msgType: string) => void;
}

const ChatTextArea = ({ input, setInput, sendMessage, activeMsgType, toggleMsgType }: ChatTextAreaProps) => {
    const pathname = usePathname();
    const isNewConversation = pathname.includes('/new');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
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

        const newHeight = Math.min(textarea.scrollHeight + siblingHeight, 5 * 30 + siblingHeight);

        textarea.parentElement!.style.height = `${newHeight}px`;
    };

    return (
        <div
            className="flex flex-col w-full mt-2 p-3 rounded-2xl border 
                 bg-background border-border hover:shadow-lg transition-shadow 
                 min-h-[72px]"
        >
            <textarea
                className="flex-1 w-full p-3 bg-transparent text-foreground 
                   focus:ring-0 focus:outline-none overflow-y-auto resize-none 
                   h-[50px] placeholder:text-muted-foreground"
                value={input}
                onChange={handleTextAreaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
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
