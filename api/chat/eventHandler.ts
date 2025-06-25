"use client"

import {CustomEvent} from "@/types/CustomEvent";
import {Conversation} from "@/types/Conversation";
import {getConversations} from "@/api/chat/getConversations";


interface EventHandlerProps {
    setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>
}


const eventHandler = async (event: CustomEvent, props: EventHandlerProps) => {
    switch (event.name) {
        case "new_conversation":
            handleNewConversation(event);
            break;
        case "title_update":
            if (props.setConversations) {
                await handleConversationTitleUpdate(props.setConversations);
            }
            break;
    }

}

const handleNewConversation = (
    event: CustomEvent,
) => {
    window.history.replaceState(null, '', `/chat/${event.params.thread_id}`);
}


const handleConversationTitleUpdate = async (
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) => {
    const conversations = await getConversations();
    setConversations(conversations);
};



export default eventHandler;
