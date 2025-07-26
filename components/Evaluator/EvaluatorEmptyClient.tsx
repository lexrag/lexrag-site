"use client";

import EvaluatorChatBox from '@/components/Evaluator/EvaluatorChatBox';
import EvaluatorChatLeftPanel from '@/components/Evaluator/EvaluatorChatLeftPanel';
import EvaluatorChatRightPanel from '@/components/Evaluator/EvaluatorChatRightPanel';


interface EvaluatorEmptyClientProps {
    onStartClick: () => void;
}

const EvaluatorEmptyClient = ({ onStartClick }: EvaluatorEmptyClientProps) => {
    return (
        <main className="flex flex-1 overflow-hidden pb-2 z-40 md:pt-0 pt-2 min-h-0">
            <EvaluatorChatLeftPanel />

            <section className="flex-1 flex flex-col overflow-hidden min-h-0 bg-transparent">
                <div className="flex-1 overflow-y-auto min-h-0 mb-[90px]">
                    <EvaluatorChatBox
                        messages={[]}
                        onStartClick={onStartClick}
                        isSent={false}
                        setSelectedMsgIdx={() => {}}
                    />
                </div>
            </section>

            <EvaluatorChatRightPanel />
        </main>
    )
};

export default EvaluatorEmptyClient;
