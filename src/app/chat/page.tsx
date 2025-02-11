import ChatBox from "@/components/Chat/ChatBox";
import Header from "@/components/Header/Header";

import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Chat',
}

const ChatPage = () => {
    return (
        <>
            <Header />
            <ChatBox />
        </>
    );
};

export default ChatPage;
