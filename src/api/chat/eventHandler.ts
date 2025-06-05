"use client"

import {CustomEvent} from "@/types/CustomEvent";
import {Conversation} from "@/types/Conversation";
import {getConversations} from "@/api/chat/getConversations";


interface EventHandlerProps {
    setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>
}


const eventHandler = async (event: CustomEvent, props: EventHandlerProps) => {
    switch (event.name) {
        case "init":
            handleConversationInit(event);
            break;
        case "update_title":
            await handleConversationTitleUpdate(props.setConversations);
            break;
    }

}

const handleConversationInit = (
    event: CustomEvent,
) => {
    if (!(event.name === "init")) {
        return
    } else {
        window.history.replaceState(null, '', `/chat/${event.params.thread_id}`);
    }
}


const handleConversationTitleUpdate = async (
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) => {
    const conversations = await getConversations();
    setConversations(conversations);
}


export default eventHandler;
