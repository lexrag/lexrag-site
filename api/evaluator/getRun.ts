import renderMessageMd from '@/utils/renderMessageMd';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types/Message';
import { EvaluatorRun } from '@/types/EvaluatorRun';

export const getRun = async (threadId: string): Promise<EvaluatorRun> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/evaluator/run/${threadId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const messages = [];

    for (const msg of data.run.conversation) {
        const direction = msg.role === "ai" ? "incoming" : "outgoing";
        const html = await renderMessageMd(msg.content);

        const newMessage: Message = {
            html,
            id: uuidv4(),
            content: msg.content,
            direction: direction,
        };

        messages.push(newMessage);
    }

    return {
        ...data.run,
        conversation: messages,
    }
};
