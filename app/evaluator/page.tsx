'use client'

import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import EvaluatorEmptyClient from '@/components/Evaluator/EvaluatorEmptyClient';

export default function EvaluatorPage() {
    const onStartClick = () => {
        redirect(`/evaluator/${uuidv4()}`)
    }
    
    return (
        <EvaluatorEmptyClient onStartClick={onStartClick} />
    )
}
