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
    href: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/service/how-does-it-works-1.svg',
        title: 'Faster answers, every time',
        description:
            'Research that used to take hours now takes minutes — helping you respond quickly and confidently.',
        href: '/pricing',
    },
    {
        id: 2,
        img: '/media/service/how-does-it-works-2.svg',
        title: 'Defensible answers with citations',
        description:
            'Every result is transparent and backed by verifiable sources, so you can trust and defend your work.',
        href: '/pricing',
    },
    {
        id: 3,
        img: '/media/service/how-does-it-works-3.svg',
        title: 'Scale your team without scaling costs',
        description:
            'Handle more matters in parallel without adding headcount — boost throughput while keeping quality.',
        href: '/pricing',
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
            className="will-change-[transform] w-full md:w-[384px]"
        >
            <div className="p-6 flex justify-center flex-col items-center md:w-[384px] w-full bg-[#17245C1F] rounded-3xl  md:h-[409px]">
                <Image
                    src={feature.img}
                    className="mb-6 md:w-[136px] md:h-[136px] w-[65px] h-[65px]"
                    alt={feature.title}
                    width={136}
                    height={136}
                />
                <h6 className="font-semibold md:text-2xl text-lg mb-5 mr-auto leading-[110%]">{feature.title}</h6>
                <p className="text-[16px] md:leading-[130%] leading-[110%] font-normal mb-6">{feature.description}</p>
                <Link
                    className="text-axis-indigo border border-phase-green hover:bg-phase-green font-medium text-base py-2 px-4 md:px-[36px] rounded-full transition-colors"
                    href={feature.href}
                >
                    Learn more
                </Link>
            </div>
        </motion.div>
    );
}

export default function WhatTheServiceDoes({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <h2 className="md:mb-[55px] mb-6 text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                What the service does
            </h2>

            <div className="flex gap-6 flex-wrap md:flex-nowrap">
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
