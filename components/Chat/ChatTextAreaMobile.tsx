'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MobileInput } from '@/components/ui/mobile-input';

export interface ChatTextAreaMobileProps {
    input: string;
    setInput: (text: string) => void;
    sendMessage: (message: string, isNew: boolean) => void;
    activeMsgType: string | null;
    toggleMsgType: (msgType: string) => void;
}

const ChatTextAreaMobile = ({ 
    input, 
    setInput, 
    sendMessage
}: ChatTextAreaMobileProps) => {
    const pathname = usePathname();
    const isNewConversation = pathname.includes('/new');

    const handleSend = () => {
        if (input.trim()) {
            sendMessage(input, isNewConversation);
            setInput('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="md:hidden">
            {/* Mobile input with keyboard attachment */}
            <MobileInput
                value={input}
                onChange={handleInputChange}
                onSend={handleSend}
                placeholder="Ask anything..."
                showAttachButton={true}
                showVoiceButton={true}
                className="z-50"
            />
        </div>
    );
};

export default ChatTextAreaMobile; 