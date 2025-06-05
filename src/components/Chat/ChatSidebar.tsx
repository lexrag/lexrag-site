"use client"

import {GoSidebarExpand} from "react-icons/go";
import {Conversation} from "@/types/Conversation";
import Link from "next/link";
import {FaRegTrashAlt} from "react-icons/fa";

interface ChatSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
}

const ChatSidebar = (
    {isOpen, setIsOpen, conversations, onDeleteConversation}: ChatSidebarProps
) => {

    return (
        <div className="w-[98%] h-[98%] border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b-2">
                <button className="border-2 border-gray-400 rounded p-2">
                    New
                </button>
                <GoSidebarExpand
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    size={30}
                />
            </div>

            <ul>
                {conversations.map((c) => {
                    return (
                        <li key={c.thread_id} className="flex justify-between p-2">
                            <Link href={`/chat/${c.thread_id}`}>
                                {c.title}
                            </Link>
                            <FaRegTrashAlt
                                className="cursor-pointer"
                                onClick={() => onDeleteConversation(c.thread_id)}
                            />
                        </li>
                    )
                })}
            </ul>

        </div>
    );
}

export default ChatSidebar;
