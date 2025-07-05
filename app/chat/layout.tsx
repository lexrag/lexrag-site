'use client';

import { ReactNode } from 'react';
import ChatProvider from '@/components/Chat/ChatProvider';

export default function Layout({ children }: { children: ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>;
}
