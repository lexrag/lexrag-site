import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface ChatItemProps {
    thread_id: string;
    title: string;
    onDeleteConversation: (thread_id: string) => void;
}

export function ChatItem({ thread_id, title, onDeleteConversation }: ChatItemProps) {
    return (
        <li
            key={thread_id}
            className="group flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-muted transition-colors"
        >
            <Link className="text-sm text-gray-800 truncate max-w-[85%]" href={`/chat/${thread_id}`}>
                {title || 'New chat'}
            </Link>
            <div
                className="md:hidden block group-hover:block"
                onClick={(e) => {
                    e.preventDefault();
                    onDeleteConversation(thread_id);
                }}
            >
                <Trash2 size={16} className="text-muted-foreground hover:text-destructive transition" />
            </div>
        </li>
    );
}
