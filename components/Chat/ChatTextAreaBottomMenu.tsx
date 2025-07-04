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
        props.sendMessage(props.input, props.isNewConversation ?? false);
        props.setInput('');
    };

    return (
        <div className="flex items-center justify-between border-gray-200 dark:border-gray-600">
            <div className="flex space-x-1 mt-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Settings2 className="size-6 cursor-pointer" />
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

            <SendHorizontal className="size-6 cursor-pointer" onClick={handleSendButtonClick} />
        </div>
    );
};

export default ChatTextAreaBottomMenu;
