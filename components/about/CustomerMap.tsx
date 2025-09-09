'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Feature = {
    id: number;
    img: string;
    title: string;
    problems: string[];
    solutions: string[];
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/about/customer-map-1.svg',
        title: 'Law Firms ',
        problems: ['Junior staff overloaded', 'Costly manual research', 'Risk of missing precedents'],
        solutions: ['Rapid, explainable research', 'Collaborative expert review', 'Document analysis at scale'],
    },
    {
        id: 2,
        img: '/media/about/customer-map-2.svg',
        title: 'Law + AI Expertise',
        problems: ['Contract review bottlenecks', 'Compliance risks', 'Pressure to deliver clarity to management'],
        solutions: [
            'Automated risk checks',
            'Fast retrieval across regulations',
            'Transparent reports for stakeholders',
        ],
    },
    {
        id: 3,
        img: '/media/about/customer-map-3.svg',
        title: 'Solo to Global',
        problems: ['No partner to double-check arguments', 'Need for affordable tools', 'Time constraints'],
        solutions: [
            'Second opinion via Synthetic Panel',
            'Flexible pay-as-you-go credits',
            'Research with verifiable sources',
        ],
    },
];

function CardItem({
    feature,
    index,
    progress,
    prefersReduce,
}: {
    feature: Feature;
    index: number;
    progress: MotionValue<number>;
    prefersReduce: boolean;
}) {
    const start = index * 0.12;
    const end = start + 0.22;

    const y = useTransform(progress, [start, end], prefersReduce ? [0, 0] : [56, 0]);
    const scale = useTransform(progress, [start, end], prefersReduce ? [1, 1] : [0.975, 1]);

    return (
        <motion.div
            style={{ y, scale, transformOrigin: 'bottom center' }}
            className="will-change-[transform] w-full flex-1 hover:scale-102 transition-all duration-500 group cursor-pointer"
        >
            <div className="relative md:h-[279px] h-auto min-h-[240px] [perspective:1000px]">
                <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] md:p-10 p-4 flex justify-start flex-col items-start rounded-3xl bg-gradient-to-br from-[#593EDC8C] to-[#FF5C00E5]">
                        <div className="flex items-center gap-4 mr-auto">
                            <Image src={feature.img} className="" alt={feature.title} width={30} height={30} />
                            <h6 className="md:text-[24px] text-[18px] font-semibold">{feature.title}</h6>
                        </div>

                        <div className="mt-2">
                            <div className="text-[#EE5000] rounded-full border border-[#EE5000] py-0.5 px-3 font-medium bg-[#FFEFE5] my-5 w-max md:text-base text-sm">
                                Problem
                            </div>

                            <ul className="list-disc pl-6">
                                {feature.problems.map((item) => (
                                    <li key={item} className="md:max-w-[284px] max-w-[250px] md:text-base text-sm">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-10 p-4 flex justify-start flex-col items-start rounded-3xl bg-gradient-to-br from-[#7f6be5] to-[#694AFF]">
                        <div className="flex items-center gap-4 mr-auto">
                            <Image src={feature.img} className="" alt={feature.title} width={30} height={30} />
                            <h6 className="md:text-[24px] text-[18px] font-semibold">{feature.title}</h6>
                        </div>

                        <div className="mt-2">
                            <div className="text-phase-green rounded-full border border-phase-green py-0.5 px-3 font-medium bg-[#E6FCF1] my-5 w-max md:text-base text-sm">
                                Solution
                            </div>

                            <ul className="list-disc pl-6">
                                {feature.solutions.map((item) => (
                                    <li key={item} className="md:max-w-[284px] max-w-[250px] md:text-base text-sm">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CustomerMap({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                Customer Persona Map
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mb-[75px] mb-8">
                {FEATURES.map((f, i) => (
                    <CardItem
                        key={f.id}
                        feature={f}
                        index={i}
                        progress={scrollYProgress}
                        prefersReduce={!!prefersReduce}
                    />
                ))}
            </div>

            <div className="md:text-[60px]/[110%] text-[24px]/[120%] text-axis-indigo rounded-3xl md:px-[80px] px-4 md:py-[78px] py-8 border border-white bg-gradient-to-b from-[#FFFFFF4D] to-white md:text-left text-center">
                "We believe AI should support a lawyer's expertise — not replace it."
            </div>
        </section>
    );
}
