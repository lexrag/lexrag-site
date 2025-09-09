'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Feature = {
    id: number;
    img: string;
    title?: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/use-case/environment-1.svg',
        title: 'SaaS',
    },
    {
        id: 2,
        img: '/media/use-case/environment-2.svg',
        title: 'VPC',
    },
    {
        id: 3,
        img: '/media/use-case/environment-3.svg',
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
            className="will-change-[transform] bg-[#BBBCFA] py-[37px] rounded-3xl"
        >
            <div className="p-6 flex flex-col items-center rounded-3xl">
                <Image src={feature.img} width={index === 1 ? 116 : 200} height={116} alt="image" />
                {feature.title && <h6 className="mt-3 font-semibold text-axis-indigo text-lg">{feature.title}</h6>}
            </div>
        </motion.div>
    );
}

export default function Environments({ className }: { className?: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 65%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <p className="text-midnight-core mb-5 mt-[52px] text-[40px]/[110%] font-semibold">Enviroments</p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
