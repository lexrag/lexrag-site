import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Message } from '@/types/Message';
import Spinner from '@/components/ui/spinner';


interface EvaluatorChatBoxProps {
    messages: Message[] | [];
    onStartClick: () => void;
    isSent: boolean;
    setSelectedMsgIdx: (idx: number) => void;
}

interface isThinkingObj {
    isThinking: boolean;
    direction: "incoming" | "outgoing";
    count: number;
}

const EvaluatorChatBox = ({
    messages,
    onStartClick,
    isSent,
    setSelectedMsgIdx,
}: EvaluatorChatBoxProps) => {
    const [isThinkingObj, setIsThinkingObj] = useState<isThinkingObj | null>(null);

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        const direction = lastMsg?.direction === "incoming" ? "outgoing" : "incoming";

        setIsThinkingObj(prev => ({
            direction,
            isThinking: true,
            count: (prev?.count || 0) + 1,
        }));

        if (isThinkingObj && messages.length === 6) {
            setIsThinkingObj({...isThinkingObj, isThinking: false});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    const onStartClickOverride = () => {
        setIsThinkingObj({
            direction: "outgoing",
            isThinking: true,
            count: 0,
        })
        onStartClick();
    }

    const onMessageClick = (index: number) => {
        if (index % 2 !== 0) { // only applicable for AI messages
            setSelectedMsgIdx(index);
        }
    }

    return (
        <div className={'flex flex-col w-full h-full'}>
            {messages.length === 0 && (
                <div className={'h-full flex flex-col justify-center items-center'}>
                    <h1 className={'text-xl font-bold'}>Press "start" to start a synthetic conversation</h1>
                </div>
            )}

            {messages.length > 0 && (
                <div className={'w-full h-full flex flex-col gap-5 mb-4'}>
                    {messages.map((msg, i) => (
                        <div
                            key={msg.id}
                            className={`flex cursor-pointer ${msg.direction === 'incoming' ? 'justify-start' : 'justify-end'} ${i === 0 ? 'pt-8 md:pt-8 pt-4' : 'pt-0'}`}
                            onClick={() => onMessageClick(i)}
                        >
                            <div
                                className={`flex flex-col ${
                                    msg.direction === 'incoming' ? 'items-start' : 'items-end'
                                } relative ${msg.direction !== 'incoming' ? 'max-w-[60%]' : ''}`}
                            >
                                <div
                                    className={`p-5 md:p-3 rounded-lg text-sm message-text ${
                                        msg.direction === 'incoming'
                                            ? 'bg-stone-100 dark:bg-stone-900 text-gray-900 dark:text-white'
                                            : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: msg.html ?? '' }}
                                ></div>
                            </div>
                        </div>
                    ))}

                    {isThinkingObj && isThinkingObj.isThinking && (
                        <div
                            className={`flex ${isThinkingObj.direction === 'incoming' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`flex flex-col ${
                                    isThinkingObj.direction === 'incoming' ? 'items-start' : 'items-end'
                                } relative m-5 ${isThinkingObj.direction !== 'incoming' ? 'max-w-[60%]' : ''}`}
                            >
                                <Spinner />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={'flex-shrink-0 flex justify-center items-center'}>
                <div
                    className={
                        'rounded-md border bg-background border-border hover:shadow-lg ' +
                        'transition-shadow md:min-h-[72px] min-h-[60px] ' +
                        'flex-shrink-0 fixed bottom-2 w-[90%] md:w-2/4 flex items-center justify-center'
                    }
                >
                    {(!isSent && messages.length === 0) && (
                        <button
                            className={'cursor-pointer w-full h-full'}
                            onClick={onStartClickOverride}
                            //disabled={messages.length > 0}
                        >
                            Start
                        </button>
                    )}

                    {(isSent || messages.length > 0) && (
                        <button
                            className={'cursor-pointer w-full h-full'}
                            onClick={() => {redirect("/evaluator")}}
                            //disabled={messages.length > 0}
                        >
                            Restart
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EvaluatorChatBox;
