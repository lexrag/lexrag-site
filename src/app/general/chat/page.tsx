import ChatBox from "@/components/Chat/ChatBox";

import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Chat',
}

const ChatPage = () => {
    return <ChatBox />
};

export default ChatPage;
