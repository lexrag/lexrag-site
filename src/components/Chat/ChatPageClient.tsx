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

const ChatPageClient = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const socket = useContext(ChatSocketContext);

    useEffect(() => {
        const fetchConversations = async () => {
            const conversations = await getConversations();
            setConversations(conversations);
        }
        fetchConversations();
    }, [])

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations(prev => prev.filter(c => c.thread_id !== threadId));
    }

    return (

        <div>
            <div className={`
                fixed h-[100vh] w-[15%] 
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
                flex flex-col min-h-screen relative transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'ml-[15%]' : 'ml-0'}
            `}>
                <div className={`
                    flex items-center transition-opacity duration-300 ease-in-out
                    ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
                `}>
                    <GoSidebarCollapse
                        className="absolute top-5.5 left-4 z-15 cursor-pointer"
                        onClick={() => setIsSidebarOpen(true)}
                        size={25}
                    />
                </div>

                <Header className={`
                    absolute top-0 z-10 dark:bg-coal-500 light:bg-white transition-colors 
                    ${isSidebarOpen ? "pl-[2%]" : "pl-[5%]"} pr-[5%]`
                }/>

                <main className="flex-grow mt-20">
                    <ChatBox socket={socket} setConversations={setConversations} />
                </main>

                <div className="absolute bottom-0 w-full light:bg-white dark:bg-[#0D0E12]">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default ChatPageClient;
