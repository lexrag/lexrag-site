import renderMessageMd from '@/utils/renderMessageMd';
import { v4 as uuidv4 } from 'uuid';

export const getConversationSnapshot = async (threadId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${threadId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return [];
    }

    return await Promise.all(
        data.messages.map(async (m: any) => ({
            id: uuidv4(),
            content: m.data.content,
            direction: m.type === 'human' ? 'outgoing' : 'incoming',
            html: await renderMessageMd(m.data.content),
            relevantContext: m.relevant_context,
            allRetrievedNodes: m.all_retrieved_nodes,
            allRetrievedNodesWithNeighbors: m.all_retrieved_nodes_with_neighbors,
            relevantRetrievedNodes: m.relevant_retrieved_nodes
        })),
    );
};
