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
        <div className="w-[98%] h-[98%] border-2 border-gray-200 rounded-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b-2">
                <h3 className="text-lg">
                    Chat
                </h3>
                <GoSidebarExpand
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    size={25}
                />
            </div>

            <div className="flex-grow overflow-y-auto p-2 space-y-2">
                <ul>
                    {conversations.map((c) => {
                        return (
                            <Link key={c.thread_id} href={`/chat/${c.thread_id}`}>
                                <li className="flex justify-between p-4 m-2 border-2 rounded">
                                    <p className="overflow-x-hidden whitespace-nowrap">
                                        {c.title}
                                    </p>
                                    <FaRegTrashAlt
                                        className="cursor-pointer ml-1"
                                        onClick={() => onDeleteConversation(c.thread_id)}
                                    />
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>

            <div className="p-4 border-t-2">
                <Link href={"/chat/new"}>
                    <button className="w-full border-2 p-2 rounded">New</button>
                </Link>
            </div>

        </div>
    );
}

export default ChatSidebar;
