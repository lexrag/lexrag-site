'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Card = {
    img: string;
    mdW: number;
    mdH: number;
    w: number;
    h: number;
    label: string;
};

const CARDS: Card[] = [
    {
        img: '/media/technology/integration-options-1.svg',
        mdW: 211,
        mdH: 181,
        w: 124,
        h: 120,
        label: 'API/MCP-centric',
    },
    {
        img: '/media/technology/integration-options-2.svg',
        mdW: 211,
        mdH: 181,
        w: 124,
        h: 120,
        label: 'CRM/DMS/KMS plugins',
    },
    {
        img: '/media/technology/integration-options-3.svg',
        mdW: 215,
        mdH: 181,
        w: 124,
        h: 120,
        label: 'Standalone platform',
    },
];

function CardItem({
    item,
    index,
    progress,
    prefersReduce,
}: {
    item: { img: string; mdW: number; mdH: number; label: string };
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
            className="flex flex-col w-full md:w-[384px] rounded-[24px] items-center bg-[#BBBCFA] pt-[36px] pb-[28px] px-2 will-change-[transform] text-center"
        >
            <Image
                className="md:w-[211px] md:h-[181px] w-[75px] h-[75px]"
                src={item.img}
                alt={item.label}
                width={item.mdW}
                height={item.mdH}
                priority={false}
            />
            <span className="text-axis-indigo text-md md:text-xl font-medium mt-auto">{item.label}</span>
        </motion.div>
    );
}

export default function IntegrationOptions({ className = '' }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={className}>
            <h2 className="text-midnight-core text-[32px] md:text-[64px]/[110%] mb-5 md:mb-[52px]">
                Integration Options
            </h2>

            <div className="flex gap-[25px] flex-wrap md:flex-nowrap justify-center">
                {CARDS.map((item, i) => (
                    <CardItem
                        key={item.label}
                        item={item}
                        index={i}
                        progress={scrollYProgress}
                        prefersReduce={!!prefersReduce}
                    />
                ))}
            </div>

            <div className="text-center mt-[52px]">
                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-opacity hover:opacity-85"
                    href="/technology"
                >
                    Explore Integration Guide
                </Link>
            </div>
        </section>
    );
}
