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

    const { socket, connectionError } = useChatContext();
    const { messages } = useChat({ websocket: socket, setEvaluatorRun: setThisRun });

    const threadId = useMemo(() => {
        const id = pathname.replace("/evaluator/", "").trim();
        const result = id === "" || id === pathname ? null : id;
        console.log('Extracted threadId from pathname:', result);
        return result;
    }, [pathname]);

    const sentOnce = useRef(false);

    useEffect(() => {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        if (!threadId || sentOnce.current) return;
        
        // Check if threadId looks like a valid UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(threadId)) {
            console.log('Thread ID is not a valid UUID, skipping WebSocket send:', threadId);
            return;
        }
        
        // Only skip if we have conversation data from API and no new messages
        if (thisRun?.conversation && thisRun.conversation.length > 0 && messages.length === 0) {
            console.log('Skipping WebSocket send - conversation already loaded from API and no new messages');
            return;
        }
        
        const payload = JSON.stringify({ thread_id: threadId });
        socket.send(payload);
        sentOnce.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.readyState, threadId, thisRun]);

    const getCurrentRun = async () => {
        try {
            if (!threadId) return;
            
            // Check if threadId looks like a valid UUID
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(threadId)) {
                return;
            }
            
            console.log('Fetching run for threadId:', threadId);
            const currentRun = await getRun(threadId);
            // Always set the run, even if conversation is empty
            setThisRun(currentRun);
        } catch (e) {
            console.error('Failed to get run:', e);
            // Set empty run structure on error
            const emptyRun = {
                thread_id: parseInt(threadId || '0') || 0,
                user_id: 0,
                avatar: {},
                conversation: [],
                evaluations: []
            };
            setThisRun(emptyRun);
        }
    }

    useEffect(() => {
        if (threadId) {
            console.log('Getting current run for thread:', threadId);
            // Initialize empty run structure for new threadId
            if (!thisRun || thisRun.thread_id !== parseInt(threadId)) {
                const emptyRun = {
                    thread_id: parseInt(threadId) || 0,
                    user_id: 0,
                    avatar: {},
                    conversation: [],
                    evaluations: []
                };
                setThisRun(emptyRun);
                // Try to fetch existing data from API
                getCurrentRun();
            }
        } else {
            // Clear run data if no threadId
            setThisRun(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threadId]); // Removed thisRun dependency to avoid infinite loops

    // Force re-render when thisRun changes
    useEffect(() => {
        console.log('thisRun changed, forcing re-render');
    }, [thisRun]);

    useEffect(() => {
        console.log('thisRun updated:', thisRun);
        console.log('thisRun conversation length:', thisRun?.conversation?.length);
    }, [thisRun]);

    return (
        <main className="flex flex-1 overflow-hidden pb-2 z-40 md:pt-0 pt-2 min-h-0">
            <EvaluatorChatLeftPanel />

            <section className="flex-1 flex flex-col overflow-hidden min-h-0 bg-transparent">
                <div className="flex-1 overflow-y-auto min-h-0 mb-[90px]">
                    <EvaluatorChatBox
                        key={`evaluator-chat-${thisRun?.thread_id || 'new'}-${thisRun?.conversation?.length || 0}-${messages.length}`}
                        messages={[...(thisRun?.conversation || []), ...messages]}
                        onStartClick={onStartClick}
                        isSent={sentOnce.current}
                        setSelectedMsgIdx={setSelectedMsgIdx}
                        connectionError={connectionError}
                    />
                </div>
            </section>

            <EvaluatorChatRightPanel thisRun={thisRun || undefined} currentMsgIdx={selectedMsgIdx} />
        </main>
    )
};

export default EvaluatorClient;
