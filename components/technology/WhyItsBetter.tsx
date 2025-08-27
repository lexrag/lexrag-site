'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import { CircleCheck, CircleX } from 'lucide-react';

type WhyIconItem = {
    bad: { label: string; img: string };
    good: { label: string; img: string };
};

export type WhyItsBetterProps = {
    className?: string;
    items?: WhyIconItem[];
};

const DEFAULT_ITEMS: WhyIconItem[] = [
    {
        bad: { label: 'Hallucinations в общем-LLM', img: '/media/technology/why-it-better-1.svg' },
        good: { label: 'RAG + source-trace', img: '/media/technology/why-it-better-5.svg' },
    },
    {
        bad: { label: 'Hallucinations в общем-LLM', img: '/media/technology/why-it-better-2.svg' },
        good: { label: 'Graph-Intelligence', img: '/media/technology/why-it-better-6.svg' },
    },
    {
        bad: { label: 'Вендор-лок-ин', img: '/media/technology/why-it-better-3.svg' },
        good: { label: 'Любой LLM / on-prem', img: '/media/technology/why-it-better-7.svg' },
    },
    {
        bad: { label: 'Black-box выводы', img: '/media/technology/why-it-better-4.svg' },
        good: { label: 'Explainable reasoning', img: '/media/technology/why-it-better-8.svg' },
    },
];

export default function WhyItsBetter({ className = '', items = DEFAULT_ITEMS }: WhyItsBetterProps) {
    return (
        <section className={cx('w-full relative mt-[75px]', className)}>
            <h2 className="text-midnight-core text-[40px] md:text-[64px]/[110%] mb-[32px] md:mb-[52px]">
                Why it’s better
            </h2>

            <div className="flex flex-col gap-6 pb-[52px]">
                {items.map((it, i) => (
                    <Row key={i} bad={it.bad} good={it.good} />
                ))}
            </div>

            <div className="flex md:flex-row flex-col md:gap-[84px] mt-8 gap-4 items-start">
                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                    href="/technology"
                >
                    See the tech in action
                </Link>
                <Link
                    className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors text-axis-indigo"
                    href="/technology"
                >
                    Start Free Trial
                </Link>
            </div>
        </section>
    );
}

function Row({ bad, good }: { bad: { label: string; img: string }; good: { label: string; img: string } }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[42px]">
            <div className="flex items-stretch gap-4">
                <GradientTile variant="bad">
                    <Image src={bad.img} width={80} height={80} className="" alt="image" />
                </GradientTile>
                <Pill tone="bad" className="flex-1">
                    <CircleX size={18} className="inline text-[#FF5C00] mb-0.5 mr-2" />
                    <span className="text-[16px] text-midnight-core">{good.label}</span>
                </Pill>
            </div>

            <div className="flex items-stretch gap-4">
                <GradientTile variant="good">
                    <Image src={good.img} width={80} height={80} className="" alt="image" />
                </GradientTile>
                <Pill tone="good" className="flex-1 flex items-center">
                    <CircleCheck size={18} className="inline text-phase-green mb-0.5 mr-2" />
                    <span className="text-[16px] text-midnight-core">{good.label}</span>
                </Pill>
            </div>
        </div>
    );
}

function GradientTile({ children, variant = 'good' }: { children: React.ReactNode; variant?: 'good' | 'bad' }) {
    const isGood = variant === 'good';
    return (
        <div
            className={cx(
                'grid place-items-center h-[102px] w-[102px] shrink-0 rounded-2xl p-[10px] shadow-sm',
                isGood
                    ? 'bg-gradient-to-br from-[#E6FCF1] to-phase-green'
                    : 'bg-gradient-to-br from-[#FFEFE5] to-[#FF5C00]',
            )}
        >
            {children}
        </div>
    );
}

function Pill({
    children,
    tone = 'good',
    className = '',
}: {
    children: React.ReactNode;
    tone?: 'good' | 'bad';
    className?: string;
}) {
    const isGood = tone === 'good';
    return (
        <div
            className={cx(
                'flex items-center gap-3 rounded-[24px] px-5 py-4 ring-1 ring-white/30 shadow-sm backdrop-blur',
                isGood ? 'bg-[#E6FCF1]' : 'bg-[#FFEFE5]',
                className,
            )}
        >
            <span className={cx('text-base md:text-lg truncate', isGood ? 'text-emerald-800' : 'text-orange-800')}>
                {children}
            </span>
        </div>
    );
}
