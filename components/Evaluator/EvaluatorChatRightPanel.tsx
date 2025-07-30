import { useEffect, useState } from 'react';
import { EvaluatorRun } from '@/types/EvaluatorRun';


type TabsType = "avatar" | "evaluations";
const tabs = ["Avatar", "Evaluations"];

interface EvaluatorChatRightPanelProps {
    thisRun?: EvaluatorRun;
    currentMsgIdx?: number;
}

const EvaluatorChatRightPanel = ({ thisRun, currentMsgIdx }: EvaluatorChatRightPanelProps) => {
    const [currentTab, setCurrentTab] = useState<TabsType>("avatar");
    const evaluation = thisRun?.evaluations?.[Math.floor((currentMsgIdx || 0) / 2)];
    const hasEvaluations = thisRun?.evaluations && thisRun.evaluations.length > 0;

    useEffect(() => {console.log(Math.floor((currentMsgIdx || 0) / 2))}, [currentMsgIdx]);

    return (
        <div className={'h-full w-1/4 hidden md:flex flex-col p-5 overflow-y-scroll'}>
            <div className={'flex justify-around items-center'}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setCurrentTab(tab.toLowerCase() as TabsType);
                        }}
                        className={`border-1 rounded p-2 m-2 cursor-pointer 
                            ${currentTab === tab.toLowerCase() ? 'bg-primary text-white' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {currentTab === 'avatar' && thisRun?.avatar && typeof thisRun.avatar === 'object' && Object.keys(thisRun.avatar).length > 0 && (
                <div className="mt-4">
                    {Object.entries(thisRun.avatar).map(([key, value]) => (
                        <div key={key} className={"flex flex-col justify-center border-b-2 mb-6"}>
                            <div className={'pr-5'}>
                                <h3 className={'text-lg font-bold'}>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                                </h3>
                            </div>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {currentTab === 'avatar' && (!thisRun?.avatar || typeof thisRun.avatar !== 'object' || Object.keys(thisRun.avatar || {}).length === 0) && (
                <div className={'flex flex-col justify-center items-center mt-4'}>
                    <p className={'text-gray-500'}>No avatar data available yet.</p>
                </div>
            )}

            {currentTab === 'evaluations' && hasEvaluations && evaluation && evaluation.characteristics && (
                <div className={'flex flex-col justify-center items-center'}>
                    {evaluation.characteristics.map((c, i) => (
                        <div key={i}>
                            <div className={'m-5 border-b-2 flex flex-col justify-center items-center'}>
                                <h3 className={'text-lg font-bold'}>
                                    {c.name.charAt(0).toUpperCase() + c.name.slice(1).replace('_', ' ')}
                                </h3>
                            </div>

                            <div className={'mb-5'}>
                                <h3 className={'text-lg font-bold'}>Score</h3>
                                <p>
                                    <strong>{c.score}</strong>/10
                                </p>
                            </div>

                            <div>
                                <h3 className={'text-lg font-bold'}>Comment</h3>
                                <p>{c.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {currentTab === 'evaluations' && !hasEvaluations && (
                <div className={'flex flex-col justify-center items-center mt-4'}>
                    <p className={'text-gray-500'}>No evaluations available yet.</p>
                </div>
            )}
        </div>
    );
}

export default EvaluatorChatRightPanel;
