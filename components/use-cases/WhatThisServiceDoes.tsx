'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { LinkPrimary } from '../ui/link-primary';

type CardDef = {
    img: string;
    imgActive: string;
    title: string;
    desc: string;
};

const CARDS: CardDef[] = [
    {
        img: '/media/use-case/what-service-does-1.svg',
        imgActive: '/media/use-case/what-service-does-active-1.svg',
        title: 'Cited Answer',
        desc: 'Every claim linked to source.',
    },
    {
        img: '/media/use-case/what-service-does-3.svg',
        imgActive: '/media/use-case/what-service-does-active-3.svg',
        title: 'Risk Table',
        desc: 'Quick view of compliance gaps.',
    },
    {
        img: '/media/use-case/what-service-does-2.svg',
        imgActive: '/media/use-case/what-service-does-active-2.svg',
        title: 'Compare Drafts',
        desc: 'Track changes across versions.',
    },
];

function CardItem({
    item,
    index,
    progress,
    prefersReduce,
}: {
    item: CardDef;
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
            className="group will-change-[transform] w-[284px] h-[200px] xl:h-[287px] xl:w-[384px] hover:scale-102 transition-transform"
        >
            <div
                className={
                    'pt-8 px-6 pb-4 md:pt-[45px] transition-colors h-[200px] xl:h-[287px] w-full rounded-[24px] flex flex-col items-center bg-[#17245C1F]'
                }
            >
                <Image
                    className="mb-5 xl:w-[140px] xl:h-[140px] w-[75px] h-[65px] group-hover:hidden"
                    src={item.img}
                    width={140}
                    height={140}
                    alt={'image'}
                />
                <Image
                    className="mb-5 xl:w-[140px] xl:h-[140px] w-[75px] h-[65px] hidden group-hover:block"
                    src={item.imgActive}
                    width={140}
                    height={140}
                    alt={'image'}
                />
                <h6 className="text-axis-indigo text-center text-[14px] md:text-base mr-auto font-semibold mb-[25px]">
                    {item.title}
                </h6>
                <p className="text-axis-indigo mr-auto text-[14px] text-left group-hover:text-axis-indigo transition-colors">
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function WhatThisServiceDoes({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={`${className}`}>
            <h2 className="text-midnight-core text-[32px]/[110%] md:text-[64px]/[110%] md:mb-[55px] mb-5">
                What the service does
            </h2>

            <div className="flex flex-wrap xl:flex-nowrap justify-center gap-6 items-center">
                {CARDS.map((item, i) => (
                    <CardItem
                        key={item.title}
                        item={item}
                        index={i}
                        progress={scrollYProgress}
                        prefersReduce={!!prefersReduce}
                    />
                ))}
            </div>

            <div className="flex md:flex-nowrap flex-wrap gap-6 mt-[55px]">
                <div className="rounded-3xl py-8 bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF99] md:flex-1/3 flex-1 text-center">
                    <h6 className="text-[50px] md:text-[64px] font-bold text-phase-green">10×</h6>
                    <p className="text-midnight-core">faster reviews</p>
                </div>
                <div className="rounded-3xl py-8 bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF99] md:flex-1/2 flex-1 text-center">
                    <h6 className="text-[50px] md:text-[64px] font-bold text-phase-green">100%</h6>
                    <p className="text-midnight-core">source-traceable answers</p>
                </div>
                <div className="rounded-3xl py-8 bg-gradient-to-b from-[#06DF724D] to-[#06DF7299] md:flex-1/2 flex-1 text-center">
                    <h6 className="text-[50px] md:text-[64px] font-bold text-white">Zero</h6>
                    <p className="text-midnight-core">hallucinations in test set</p>
                </div>
            </div>

            <div className="mt-[55px] text-center">
                <LinkPrimary href="/use-cases">See demo</LinkPrimary>
            </div>
        </section>
    );
}
