import { Message } from '@/types/Message';

export interface EvaluatorRun {
    thread_id: number;
    user_id: number;
    avatar: object;
    conversation: Message[];
    evaluations: Evaluation[];
}

export interface EvaluatorMessage {
    role: string;
    content: string;
}

export interface Evaluation {
    analysis: string;
    characteristics: Characteristic[];
}

export interface Characteristic {
    name: string;
    score: number;
    comment: string;
}
