import React from 'react';
import { IoMdSend } from 'react-icons/io';
import { PiGraph } from 'react-icons/pi';
import { TfiViewList } from 'react-icons/tfi';
import { VscSettings } from 'react-icons/vsc';
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
                        <VscSettings className="size-6 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" side="top" align="start">
                        <DropdownMenuLabel>Setting</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <PiGraph />
                                <span>Semantic Graph</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <TfiViewList />
                                <span>Legal Breakdown</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* <div className="group">
                    <button
                        type="button"
                        className={`btn btn-xs btn-icon p-0 ${
                            props.activeMsgType === 'semantic_graph'
                                ? 'text-sky-700 dark:text-sky-300'
                                : 'text-gray-400 hover:text-primary'
                        } rounded`}
                        aria-label="Semantic Graph"
                        onClick={() => props.toggleMsgType('semantic_graph')}
                    >
                        <i className="ki-duotone ki-data text-xs"></i>
                    </button>
                    <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-28 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal">
                        Semantic Graph
                    </div>
                </div>

                <div className="group">
                    <button
                        type="button"
                        className={`btn btn-xs btn-icon p-0 ${
                            props.activeMsgType === 'legal_breakdown'
                                ? 'text-sky-700 dark:text-sky-300'
                                : 'text-gray-400 hover:text-primary'
                        } rounded`}
                        aria-label="Legal Breakdown"
                        onClick={() => props.toggleMsgType('legal_breakdown')}
                    >
                        <i className="ki-duotone ki-abstract-14 text-xs"></i>
                    </button>

                    <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-32 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal">
                        Legal Breakdown
                    </div>
                </div> */}
            </div>

            <IoMdSend className="size-6 cursor-pointer" onClick={handleSendButtonClick} />
            {/* <IoSendSharp size={25} color={'#015A8D'} onClick={handleSendButtonClick} className="cursor-pointer" /> */}
        </div>
    );
};

export default ChatTextAreaBottomMenu;
