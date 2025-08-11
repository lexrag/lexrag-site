'use client';

import BenefitsCard from './BenefitsCard';

const Benefits = () => {
    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-4 sm:gap-y-0 sm:gap-x-6 mb-20">
            {[
                {
                    img: 'medal',
                    title: 'No AI Hallucinations',
                    description:
                        'GraphRAG technology ensures unmatched accuracy and delivers contextually precise legal responses',
                },
                {
                    img: 'magnifying-glass',
                    title: 'Graph-Vector Search',
                    description:
                        'Leverage Graph Schema to enrich semantic search results and gain complete and accurate legal context',
                },
                {
                    img: 'clock',
                    title: 'Fast & Cost-Effective',
                    description:
                        'Significantly boost your legal research and drafting efficiency, reducing time and effort while cutting costs.',
                },
                {
                    img: 'box-scaled',
                    title: 'Flexible & Scalable',
                    description:
                        'API-based modular architecture enables integration with a variety of cloud or on-premises LLMs',
                },
            ].map((item, index) => (
                <BenefitsCard key={index} item={item} />
            ))}
        </div>
    );
};

export default Benefits;
