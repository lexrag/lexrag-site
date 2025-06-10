"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import {useContext, useEffect, useState} from "react";
import {GoSidebarCollapse} from "react-icons/go";
import ChatBox from "@/components/Chat/ChatBox";
import {Conversation} from "@/types/Conversation";
import {getConversations} from "@/api/chat/getConversations";
import deleteConversation from "@/api/chat/deleteConversation";
import {ChatSocketContext} from "@/components/Chat/ChatProvider";
import {usePathname} from "next/navigation";

const ChatPageClient = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const socket = useContext(ChatSocketContext);
    const pathname = usePathname();

    useEffect(() => {
        const fetchConversations = async () => {
            const conversations = await getConversations();
            setConversations(conversations);
        };
        fetchConversations();
    }, []);

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations(prev => prev.filter(c => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            window.history.replaceState(null, "", "/chat/new");
            window.location.reload();
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className={`
                fixed h-screen w-[20%] 
                flex flex-col items-center justify-center
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'}
            `}>
                <ChatSidebar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    conversations={conversations}
                    onDeleteConversation={onDeleteConversation}
                />
            </div>

            <div className={`
                flex flex-col w-full h-full transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'ml-[20%]' : 'ml-0'}
            `}>
                <div className="h-[64px] shrink-0 relative">
                    <Header className={`
                        absolute top-0 z-10 dark:bg-coal-500 light:bg-white transition-colors 
                        ${isSidebarOpen ? "pl-[2%]" : "pl-[5%]"} pr-[5%]`
                    }/>
                    <GoSidebarCollapse
                        className={`${isSidebarOpen ? "opacity-0" : ""} absolute top-5.5 left-4 z-15 cursor-pointer`}
                        onClick={() => setIsSidebarOpen(true)}
                        size={25}
                    />
                </div>

                <div className="flex-1 overflow-hidden">
                    <ChatBox socket={socket} setConversations={setConversations} />
                </div>

                <div className="h-[48px] shrink-0">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ChatPageClient;
