import renderMessageMd from '@/utils/renderMessageMd';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types/Message';
import { EvaluatorRun } from '@/types/EvaluatorRun';

export const getRun = async (threadId: string): Promise<EvaluatorRun> => {
    if (!threadId) {
        throw new Error('Thread ID is required');
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/evaluator/run/${threadId}`;
    console.log('Fetching evaluator run from:', url);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
        console.error('API Error:', response.status, response.statusText, data);
        
        // For 404, return empty run instead of throwing
        if (response.status === 404) {
            console.log('Run not found, returning empty structure for threadId:', threadId);
            return {
                thread_id: parseInt(threadId) || 0,
                user_id: 0,
                avatar: {},
                conversation: [],
                evaluations: []
            };
        }
        
        // For other errors, also return empty structure instead of throwing
        console.warn('API error, returning empty structure:', response.status, response.statusText);
        return {
            thread_id: parseInt(threadId) || 0,
            user_id: 0,
            avatar: {},
            conversation: [],
            evaluations: []
        };
    }

    // Check if data.run exists and has conversation
    if (!data.run) {
        console.error('No run data in response:', data);
        console.log('Response structure:', Object.keys(data));
        
        // Check if the data itself is the run (without .run wrapper)
        if (data.thread_id || data.conversation || data.evaluations) {
            console.log('Data appears to be run data directly, not wrapped in .run');
            return {
                thread_id: data.thread_id || parseInt(threadId) || 0,
                user_id: data.user_id || 0,
                avatar: data.avatar || {},
                conversation: data.conversation || [],
                evaluations: data.evaluations || []
            };
        }
        
        // Return a default structure instead of throwing
        return {
            thread_id: parseInt(threadId) || 0,
            user_id: 0,
            avatar: {},
            conversation: [],
            evaluations: []
        };
    }
    
    if (!data.run.conversation) {
        console.warn('No conversation in run data:', data.run);
        // Return run data with empty conversation
        return {
            ...data.run,
            conversation: []
        };
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
