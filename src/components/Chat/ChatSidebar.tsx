"use client"

import React from "react";
import {GoSidebarExpand} from "react-icons/go";
import {Conversation} from "@/types/Conversation";
import Link from "next/link";

interface ChatSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    conversations: Conversation[];
}

const ChatSidebar = ({isOpen, setIsOpen, conversations}: ChatSidebarProps) => {
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
                        <li key={c.thread_id}>
                            <Link href={`/chat/${c.thread_id}`}>
                                {c.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </div>
    );
}

export default ChatSidebar;
