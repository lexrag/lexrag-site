import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRuns } from '@/api/evaluator/getRuns';
import { EvaluatorRun } from '@/types/EvaluatorRun';

const EvaluatorChatLeftPanel = () => {
    const [runs, setRuns] = useState<EvaluatorRun[]>([]);

    useEffect(() => {
        const updateRuns = async () => {
            const runs = await getRuns();
            setRuns(runs);
        };
        updateRuns();
    }, []);

    return (
        <section className={'h-full w-1/4 hidden md:flex flex-col p-5'}>
            <h3 className={'text-center text-lg mb-8'}>Runs</h3>

            <div>
                {runs.map((run) => (
                    <Link key={run?.thread_id} href={`/evaluator/${run.thread_id}`}>
                        <div className={'border-1 rounded p-2 m-2 overflow-hidden'}>
                            <h4 className={'whitespace-nowrap'}>{run?.thread_id}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default EvaluatorChatLeftPanel;
