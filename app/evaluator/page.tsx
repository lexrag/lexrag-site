'use client'

import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import EvaluatorEmptyClient from '@/components/Evaluator/EvaluatorEmptyClient';
import ChatProvider from '@/components/Chat/ChatProvider';

export default function EvaluatorPage() {
    const onStartClick = () => {
        redirect(`/evaluator/${uuidv4()}`)
    }
    
    return (
        <ChatProvider mode={"evaluator"}>
            <EvaluatorEmptyClient onStartClick={onStartClick} />
        </ChatProvider>
    )
}
