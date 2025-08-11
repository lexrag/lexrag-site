import React from 'react';
import { Network, Rows3, SendHorizontal, Settings2 } from 'lucide-react';
import { ChatTextAreaProps } from '@/components/Chat/ChatTextArea';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ChatTextAreaBottomMenuProps extends ChatTextAreaProps {
    isNewConversation?: boolean;
}

const ChatTextAreaBottomMenu = (props: ChatTextAreaBottomMenuProps) => {
    const handleSendButtonClick = () => {
        props.sendMessage(props.input, props.isNewConversation ?? false, []);
        props.setInput('');
    };

    return (
        <div className="flex items-center justify-between border-gray-200 dark:border-gray-600">
            <div className="flex md:space-x-1 space-x-0.5 md:mt-2 mt-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="p-1">
                            <Settings2 className="md:size-6 size-5 cursor-pointer" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" side="top" align="start">
                        <DropdownMenuLabel>Setting</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Network />
                                <span>Semantic Graph</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Rows3 />
                                <span>Legal Breakdown</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="p-1">
                <SendHorizontal className="md:size-6 size-5 cursor-pointer" onClick={handleSendButtonClick} />
            </div>
        </div>
    );
};

export default ChatTextAreaBottomMenu;
