'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GoSidebarExpand } from 'react-icons/go';
import { Conversation } from '@/types/Conversation';

interface ChatSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    conversations: Conversation[];
    onDeleteConversation: (threadId: string) => void;
}

const ChatSidebar = ({ setIsOpen, conversations, onDeleteConversation }: ChatSidebarProps) => {
    const router = useRouter();
    console.log(conversations);

    return (
        <div className="w-[98%] h-[98%] border-2 border-gray-200 rounded-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b-2">
                <h3 className="text-lg">Chat</h3>
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
                            <li
                                key={c.thread_id}
                                onClick={() => router.push(`/chat/${c.thread_id}`)}
                                className="flex justify-between p-4 m-2 border-2 rounded cursor-pointer"
                            >
                                <p className="overflow-x-hidden whitespace-nowrap">{c.title}</p>
                                <FaRegTrashAlt
                                    className="cursor-pointer ml-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteConversation(c.thread_id);
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="p-4 border-t-2">
                <Link href={'/chat/new'}>
                    <button className="w-full border-2 p-2 rounded cursor-pointer">New</button>
                </Link>
            </div>
        </div>
    );
};

export default ChatSidebar;
