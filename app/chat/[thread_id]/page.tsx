import { Metadata } from 'next';
import ChatPageClient from '@/components/Chat/ChatPageClient';
import ChatProvider from '@/components/Chat/ChatProvider';

export const metadata: Metadata = {
  title: 'Chat',
};

const ChatPage = () => {
  return (
    <div className="w-full">
      <ChatProvider>
        <ChatPageClient />
      </ChatProvider>
    </div>
  );
};

export default ChatPage;
