import { H3, H4, PBase } from '@/components/ui/typography';
import '@/components/ui/css-variables.css';

const UseCases = () => {
    return (
        <>
            <div className="min-h-[60vh] py-10">
                <div className="mb-10">
                    <H3 className="text-[var(--Brand-Primary-Midnight-Core)] mb-5 pl-8">Use Cases</H3>
                </div>

                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
                    <div className="row-span-2 flex flex-col items-center justify-center text-center rounded-[24px] bg-gradient-to-b from-[#694AFF] to-[#D6B9FA] transition-colors">
                        <img
                            src="/media/images/pc-ai-connections.svg"
                            className="dark:hidden max-h-96 mb-6"
                            alt="AI-Powered Legal Research light"
                        />
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <H4 className="text-white dark:text-white text-left pl-8">AI-Powered Legal Research</H4>
                            </div>
                            <PBase className="text-white max-w-[80%] text-left pl-8">
                                Advanced legal search with graph visualization, semantic search, and AI-driven query
                                decomposition, providing precise and contextualized legal insights
                            </PBase>
                        </div>
                    </div>

                    <div className="p-8 pt-16 flex gap-4 items-center justify-center text-center rounded-[24px] bg-gradient-to-b from-[#694AFF] to-[#D6B9FA] transition-colors">
                        <img
                            src="/media/images/research.svg"
                            className="dark:hidden max-h-32 mb-6"
                            alt="Early Case Assessment & Guidance light"
                        />
                        <div className="flex flex-col mb-4 text-left">
                            <H4 className="text-white">Early Case Assessment & Guidance</H4>
                            <PBase className="text-white">
                                Generates structured case summaries, predicts outcomes, and offers legal strategy
                                recommendations, leveraging judicial and legislative analytics.
                            </PBase>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 col-span-1">
                        <div className="pt-8 pb-4 pr-4 flex flex-col items-center justify-center text-left rounded-[24px] bg-gradient-to-b from-[#694AFF] to-[#D6B9FA] transition-colors">
                            <img
                                src="/media/images/storage.svg"
                                className="dark:hidden max-h-32 mb-6"
                                alt="Legal Knowledge & Compliance Storage light"
                            />
                            <div className="flex flex-col gap-8">
                                <div className="">
                                    <H4 className="text-white dark:text-white pl-8">
                                        Legal knowledge & compliance storage
                                    </H4>
                                </div>
                                <PBase className="text-white pl-8">
                                    Manages legal documents, case dossiers, and AI-powered context storage, with secure
                                    on-premises LLM integration for compliance
                                </PBase>
                            </div>
                        </div>

                        <div className="pt-8 pb-4 pr-4 flex flex-col items-center justify-center text-left rounded-[24px] bg-gradient-to-b from-[#694AFF] to-[#D6B9FA] transition-colors">
                            <img
                                src="/media/images/cloud.svg"
                                className="dark:hidden max-h-32 mb-6"
                                alt="Flexible & Scalable"
                            />
                            <div className="flex flex-col gap-8">
                                <div className="">
                                    <H4 className="text-white dark:text-white pl-8">Flexible & Scalable</H4>
                                </div>
                                <PBase className="text-white max-w-[80%] pl-8">
                                    Analyzes legal risks, judicial trends, and legislative changes, providing AI-driven
                                    insights for litigation planning and case forecasting
                                </PBase>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UseCases;
