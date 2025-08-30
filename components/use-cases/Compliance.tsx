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
        img: '/media/use-case/compliance-1.svg',
    },
    {
        id: 2,
        img: '/media/use-case/compliance-2.svg',
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
            className="will-change-[transform] bg-axis-indigo py-[37px] rounded-3xl w-[384px] h-[284px]"
        >
            <div className="relatve rounded-3xl">
                <Image
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    src={feature.img}
                    width={200}
                    height={200}
                    alt="image"
                />
            </div>
        </motion.div>
    );
}

export default function Compliance({ className }: { className?: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 65%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <p className="text-midnight-core mb-5 mt-[52px] text-[40px]/[110%] font-semibold">Compliance</p>

            <div className="flex justify-around gap-6">
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
