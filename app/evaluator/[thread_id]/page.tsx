'use client'

import ChatProvider from '@/components/Chat/ChatProvider';
import EvaluatorClient from '@/components/Evaluator/EvaluatorClient';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function EvaluatorPage() {
    const onStartClick = () => {
        redirect(`/evaluator/${uuidv4()}`)
    }
    
    return (
        <ChatProvider mode={"evaluator"}>
            <EvaluatorClient onStartClick={onStartClick} />
        </ChatProvider>
    )
}
