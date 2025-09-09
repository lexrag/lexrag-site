'use client';

import { motion } from 'framer-motion';
import BenefitsCard from '@/components/Landing/BenefitsCard';
import ScrollStackItem from '@/components/scroll-stack-item/ScrollStackItem';
import '@/css/themes/reui.css';

const StackedBenefits = () => {
    const benefits = [
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
    ];

    return (
        <div className="relative">
            {/* Desktop Grid Layout */}
            <div className="hidden lg:block">
                <div className="grid lg:grid-cols-4 lg:gap-6 mb-20">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            className="h-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <BenefitsCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mobile/Tablet Stacked Layout */}
            <div className="lg:hidden">
                {/* Container for stacking cards */}
                <div className="relative">
                    {benefits.map((item, index) => (
                        <ScrollStackItem key={index} className="px-4">
                            <div className="w-full max-w-sm mx-auto">
                                <BenefitsCard item={item} />
                            </div>
                        </ScrollStackItem>
                    ))}
                </div>

                {/* Extra space after the stack */}
                <div className="h-96 mb-20"></div>
            </div>
        </div>
    );
};

export default StackedBenefits;
