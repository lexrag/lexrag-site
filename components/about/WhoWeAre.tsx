'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Feature = {
    id: number;
    img: string;
    title: string;
    description: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/about/who-we-are-1.svg',
        title: 'Singapore & Law ',
        description: 'Singapore-based, built for common law jurisdictions first.',
    },
    {
        id: 2,
        img: '/media/about/who-we-are-2.svg',
        title: 'Law + AI Expertise',
        description: 'Backed by expertise in law, AI, and compliance.',
    },
    {
        id: 3,
        img: '/media/about/who-we-are-3.svg',
        title: 'From Solo to Global',
        description: 'Designed to serve both solo practitioners and global firms.',
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
            className="will-change-[transform] w-full flex-1 hover:scale-102 transition-all duration-500"
        >
            <div className="md:p-6 p-4 flex justify-center flex-col items-center w-full rounded-3xl bg-gradient-to-br from-[#7f6be5] to-[#694AFF]">
                <div className="flex md:gap-8 gap-4 mr-auto">
                    <span className="md:text-[64px] text-[40px] text-phase-green">{`0${index + 1}`}</span>
                    <Image
                        src={feature.img}
                        className="mb-6 mt-3 md:w-[200px] md:h-[200px] w-[100px] h-[100px]"
                        alt={feature.title}
                        width={200}
                        height={200}
                    />
                </div>
                <h6 className="font-semibold md:text-3xl text-xl mb-2 mr-auto">{feature.title}</h6>
                <p className="md:text-[16px] text-sm leading-[110%] font-normal mb-6 mr-auto">{feature.description}</p>
            </div>
        </motion.div>
    );
}

export default function WhoWeAre({ className, isExpanded }: { className?: string; isExpanded: boolean }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                Who We Are
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

            {isExpanded && (
                <div className="flex md:flex-row flex-col md:px-[60px] md:py-[99px] px-5 py-8 rounded-3xl md:gap-10 gap-6 bg-gradient-to-b from-[#FFFFFF4D] to-white">
                    <div className="md:min-w-[380px] w-full">
                        <h5 className="md:max-w-[293px] max-w-full text-midnight-core mb-6 md:mb-10 md:text-[36px]/[110%] text-[24px]/[120%]">
                            Next-Generation Legal Intelligence
                        </h5>
                        <div className="flex justify-center md:justify-start">
                            <Image
                                src="/media/about/next-generation.svg"
                                height={273}
                                width={390}
                                alt="next-generation"
                                className="md:w-[390px] md:h-[273px] w-[280px] h-auto"
                            />
                        </div>
                    </div>
                    <div className="md:max-w-[660px] w-full">
                        <p className="md:text-[18px]/[120%] text-[16px]/[130%] text-midnight-core mb-4 md:mb-6">
                            LEXRAG is a next-generation legal intelligence platform designed to bring clarity, speed,
                            and accountability into legal practice.
                        </p>
                        <p className="md:text-[18px]/[120%] text-[16px]/[130%] text-midnight-core mb-4 md:mb-6">
                            Our graph-based engine maps connections between statutes, regulations, and precedents,
                            offering deeper, contextual insights than traditional keyword or semantic search tools.
                        </p>
                        <p className="md:text-[18px]/[120%] text-[16px]/[130%] text-midnight-core mb-4 md:mb-6">
                            What sets LEXRAG apart is its focus on explainability and transparency. Every answer is
                            traceable to specific legal sources, making recommendations verifiable and defensible. This
                            level of precision is unmatched in the market and makes LEXRAG ideal for high-stakes legal
                            work.
                        </p>
                        <p className="md:text-[18px]/[120%] text-[16px]/[130%] text-midnight-core mb-4 md:mb-6">
                            We are a team of lawyers, developers, and product strategists who believe that technology
                            should support legal professionals, not replace them. From solo practitioners to global law
                            firms, we build tools that meet the demands of modern practice: faster, safer, and
                            verifiable.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
