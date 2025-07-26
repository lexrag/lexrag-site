"use client";

import { useChat } from '@/api/chat/chatApi';
import { useChatContext } from '@/components/Chat/ChatProvider';
import EvaluatorChatBox from '@/components/Evaluator/EvaluatorChatBox';
import EvaluatorChatLeftPanel from '@/components/Evaluator/EvaluatorChatLeftPanel';
import EvaluatorChatRightPanel from '@/components/Evaluator/EvaluatorChatRightPanel';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EvaluatorRun } from '@/types/EvaluatorRun';
import { getRun } from '@/api/evaluator/getRun';

interface EvaluatorClientProps {
    onStartClick: () => void;
}

const EvaluatorClient = ({ onStartClick }: EvaluatorClientProps) => {
    const pathname = usePathname();
    const [thisRun, setThisRun] = useState<EvaluatorRun>();
    const [selectedMsgIdx, setSelectedMsgIdx] = useState<number>();

    const { socket } = useChatContext();
    const { messages } = useChat({ websocket: socket });

    const threadId = useMemo(() => {
        const id = pathname.replace("/evaluator/", "").trim();
        return id === "" || id === pathname ? null : id;
    }, [pathname]);

    const sentOnce = useRef(false);

    useEffect(() => {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        if (!threadId || sentOnce.current) return;
        if (thisRun?.conversation && thisRun.conversation.length > 0) return;

        const payload = JSON.stringify({ thread_id: threadId });
        socket.send(payload);
        sentOnce.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.readyState, threadId]);

    const getCurrentRun = async () => {
        try {
            const currentRun = await getRun(threadId || "");
            setThisRun(currentRun);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCurrentRun();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    useEffect(() => {
        console.log(thisRun)
    }, [thisRun]);

    return (
        <main className="flex flex-1 overflow-hidden pb-2 z-40 md:pt-0 pt-2 min-h-0">
            <EvaluatorChatLeftPanel />

            <section className="flex-1 flex flex-col overflow-hidden min-h-0 bg-transparent">
                <div className="flex-1 overflow-y-auto min-h-0 mb-[90px]">
                    <EvaluatorChatBox
                        messages={thisRun?.conversation || []}
                        onStartClick={onStartClick}
                        isSent={sentOnce.current}
                        setSelectedMsgIdx={setSelectedMsgIdx}
                    />
                </div>
            </section>

            <EvaluatorChatRightPanel thisRun={thisRun} currentMsgIdx={selectedMsgIdx} />
        </main>
    )
};

export default EvaluatorClient;
