import ChatProvider from '@/components/Chat/ChatProvider';
import EvaluatorClient from '@/components/Evaluator/EvaluatorClient';

export default function EvaluatorPage() {
    return (
        <ChatProvider mode={"evaluator"}>
            <div>Hey there</div>
            <EvaluatorClient />
        </ChatProvider>
    )
}
