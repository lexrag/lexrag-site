'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Feature = {
    id: number;
    img: string;
    title: string;
    description: string;
    linkLabel: string;
    href: string;
    technology?: string;
    security?: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/service/how-it-works-1.svg',
        title: 'Ingest',
        description: 'Upload your documents or type a legal question.',
        linkLabel: 'Graph reasoning & traceability',
        href: '/service',
        technology: '/technology',
    },
    {
        id: 2,
        img: '/media/service/how-it-works-2.svg',
        title: 'Graph Reasoning',
        description: 'Our AI maps statutes, case law, and prior research into a reasoning graph.',
        linkLabel: 'Graph reasoning & traceability',
        href: '/service',
        technology: '/technology',
    },
    {
        id: 3,
        img: '/media/service/how-it-works-3.svg',
        title: 'Explain & Cite',
        description: 'Get a concise answer with full citations you can verify and rely on.',
        linkLabel: 'Security & compliance (PDPA/GDPR/ISO/SOC2)',
        href: '/service',
        technology: '/technology',
        security: '/security',
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
            className="will-change-[transform] w-full lg:w-[384px]"
        >
            <div className="p-6 flex justify-center flex-col items-center lg:w-[384px] w-full rounded-3xl bg-gradient-to-br from-[#BBBCFA] to-[#694AFF]">
                <div className="flex gap-8 mr-auto">
                    <span className="text-[64px]">{`0${index + 1}`}</span>
                    <Image
                        src={feature.img}
                        className="mb-6 mt-3 sm:w-[200px] sm:h-[200px] w-[120px] h-[120px]"
                        alt={feature.title}
                        width={200}
                        height={200}
                    />
                </div>
                <h6 className="font-semibold text-2xl mb-2 mr-auto">{feature.title}</h6>
                <p className="text-[16px] leading-[110%] font-normal mb-6 mr-auto">{feature.description}</p>
                <Link className="mr-auto underline hover:no-underline text-[14px]" href={feature.href}>
                    {feature.linkLabel}
                </Link>

                <div className="mt-6 flex flex-wrap justify-start w-full gap-[15px]">
                    {feature.technology && (
                        <Link
                            className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                            href={feature.technology}
                        >
                            Technology
                        </Link>
                    )}
                    {feature.security && (
                        <Link
                            className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                            href={feature.security}
                        >
                            Security
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function HowItWorks({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                How it works
            </h2>

            <div className="flex gap-6 flex-wrap lg:flex-nowrap">
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
        </section>
    );
}
