import {IoSendSharp} from "react-icons/io5";
import React from "react";
import {ChatTextAreaProps} from "@/components/Chat/ChatTextArea";

interface ChatTextAreaBottomMenuProps extends ChatTextAreaProps {
    isNewConversation?: boolean;
}

const ChatTextAreaBottomMenu = (props: ChatTextAreaBottomMenuProps) => {
    const handleSendButtonClick = () => {
        props.sendMessage(props.input, props.isNewConversation)
        props.setInput("");
    }

    return (
        <div className="flex items-center justify-between border-t-2 dark:border-gray-300">

            <div className="flex space-x-1 mt-2">
                <div className="group">
                    <button
                        type="button"
                        className={`btn btn-xs btn-icon p-0 ${
                            props.activeMsgType === "semantic_graph"
                                ? "text-sky-700 dark:text-sky-300"
                                : "text-gray-400 hover:text-primary"
                        } rounded`}
                        aria-label="Semantic Graph"
                        onClick={() => props.toggleMsgType("semantic_graph")}
                    >
                        <i className="ki-duotone ki-data text-xs"></i>
                    </button>
                    <div
                        className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-28 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal"
                    >
                        Semantic Graph
                    </div>
                </div>

                <div className="group">
                    <button
                        type="button"
                        className={`btn btn-xs btn-icon p-0 ${
                            props.activeMsgType === "legal_breakdown"
                                ? "text-sky-700 dark:text-sky-300"
                                : "text-gray-400 hover:text-primary"
                        } rounded`}
                        aria-label="Legal Breakdown"
                        onClick={() => props.toggleMsgType("legal_breakdown")}
                    >
                        <i className="ki-duotone ki-abstract-14 text-xs"></i>
                    </button>

                    <div
                        className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 rounded-xl shadow-default p-1 w-32 text-center bg-light border border-gray-200 text-gray-700 text-xs font-normal"
                    >
                        Legal Breakdown
                    </div>
                </div>

            </div>

            <IoSendSharp
                size={25}
                color={"#015A8D"}
                onClick={handleSendButtonClick}
                className="cursor-pointer"
            />

        </div>
    )
}

export default ChatTextAreaBottomMenu;
