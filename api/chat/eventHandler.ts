'use client';

import { getConversations } from '@/api/chat/getConversations';
import { Conversation } from '@/types/Conversation';
import { CustomEvent } from '@/types/CustomEvent';

interface EventHandlerProps {
    setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const eventHandler = async (event: CustomEvent, props: EventHandlerProps) => {
    switch (event.name) {
        case 'new_conversation':
            handleNewConversation(event, props.setConversations);
            break;
        case 'title_update':
            if (props.setConversations) {
                await handleConversationTitleUpdate(event, props.setConversations);
            }
            break;
    }
};

const handleNewConversation = (event: CustomEvent, setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>) => {
    const threadId = event.params?.thread_id;
    
    if (threadId) {
        window.history.replaceState(null, '', `/chat/${threadId}`);
        
        if (setConversations) {
            const newConversation: Conversation = {
                thread_id: threadId,
                user_id: '',
                title: 'New chat',
                updated_at: new Date(),
                isGenerating: true,
                isTitleGenerating: true,
            };
            
            console.log('🚀 Adding new conversation to list:', threadId);
            setConversations((prevConversations) => {
                const exists = prevConversations.some(c => c.thread_id === threadId);
                if (!exists) {
                    return [newConversation, ...prevConversations];
                }
                return prevConversations;
            });
        }
    }
};

const handleConversationTitleUpdate = async (
    event: CustomEvent,
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
) => {
    console.log('📝 Title update event received:', event);
    
    if (event.params?.thread_id && event.params?.title) {
        const threadId = event.params.thread_id;
        const newTitle = event.params.title;
        
        console.log('✨ Updating conversation title:', threadId, '->', newTitle);
        
        setConversations((prevConversations) => {
            const existingConversation = prevConversations.find(
                (c) => c.thread_id === threadId
            );
            
            if (existingConversation) {
                return prevConversations.map((conversation) =>
                    conversation.thread_id === threadId
                        ? { 
                            ...conversation, 
                            title: newTitle,
                            isTitleGenerating: false
                          }
                        : conversation
                );
            } else {
                const newConversation: Conversation = {
                    thread_id: threadId,
                    user_id: '',
                    title: newTitle,
                    updated_at: new Date(),
                    isGenerating: true,
                    isTitleGenerating: false,
                };
                return [newConversation, ...prevConversations];
            }
        });
    } else {
        const conversations = await getConversations();
        setConversations(conversations);
    }
};

export default eventHandler;
