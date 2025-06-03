import {Metadata} from "next";
import ChatPageClient from "@/components/Chat/ChatPageClient";

export const metadata: Metadata = {
    title: 'Chat',
}

const ChatPage = () => {
    return <ChatPageClient />
};

export default ChatPage;
