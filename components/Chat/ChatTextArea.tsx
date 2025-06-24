import { IoSendSharp } from "react-icons/io5";
import ChatTextAreaBottomMenu from "@/components/Chat/ChatTextAreaBottomMenu";
import React from "react";
import {usePathname} from "next/navigation";

export interface ChatTextAreaProps {
    input: string;
    setInput: (text: string) => void;
    sendMessage: (message: string, isNew: boolean) => void;
    activeMsgType: string;
    toggleMsgType: (msgType: string) => void;
}

const ChatTextArea = (props: ChatTextAreaProps) => {
    const pathname = usePathname();

    let isNewConversation = false;

    if (pathname.includes("/new")) {
        isNewConversation = true;
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            props.sendMessage(props.input, isNewConversation);
            props.setInput("");
        }
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setInput(e.target.value);

        const textarea = e.target;
        const siblingHeight = textarea.nextElementSibling?.scrollHeight || 0;

        textarea.rows = 2;
        textarea.parentElement.style.height = 'auto';

        const newHeight = Math.min(textarea.scrollHeight + siblingHeight, 5 * 30 + siblingHeight);

        if (textarea.parentElement) {
            textarea.parentElement.style.height = `${newHeight}px`;
        }
    };

    return (
        <div className="flex flex-col w-full mt-2 p-3 border border-gray-300 rounded-2xl hover:shadow-lg transition-shadow min-h-[72px] light:bg-white dark:bg-gray-200">
            <textarea
                className="flex-1 w-full p-3 bg-transparent focus:ring-0 focus:outline-none overflow-y-auto resize-none h-[50px]"
                value={props.input}
                onChange={handleTextAreaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
            />

            <ChatTextAreaBottomMenu
                input={props.input}
                setInput={props.setInput}
                activeMsgType={props.activeMsgType}
                toggleMsgType={props.toggleMsgType}
                sendMessage={props.sendMessage}
                isNewConversation={isNewConversation}
            />
        </div>
    )
}

export default ChatTextArea;
