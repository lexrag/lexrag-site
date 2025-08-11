'use client';

import { useRef, useState } from 'react';
import BenefitsCard from './BenefitsCard';
import '@/components/ui/css-variables.css';

const Benefits = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const updateScrollButtons = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    const renderArrow = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            );
        }
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
            </svg>
        );
    };

    return (
        <div className="relative mb-20">
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
                {benefits.map((item, index) => (
                    <div key={index}>
                        <BenefitsCard item={item} />
                    </div>
                ))}
            </div>
            <div className="lg:hidden">
                <div
                    ref={scrollContainerRef}
                    onScroll={updateScrollButtons}
                    className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {benefits.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-80 snap-start">
                            <BenefitsCard item={item} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full transition-all duration-200 text-[var(--Brand-Primary-Axis-Indigo)] ${
                                canScrollLeft ? 'bg-white/20' : 'bg-white/10 cursor-not-allowed'
                            }`}
                            aria-label="Scroll left"
                        >
                            {renderArrow('left')}
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full transition-all duration-200 text-[var(--Brand-Primary-Axis-Indigo)] ${
                                canScrollRight ? 'bg-white/20' : 'bg-white/10 cursor-not-allowed'
                            }`}
                            aria-label="Scroll right"
                        >
                            {renderArrow('right')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;
