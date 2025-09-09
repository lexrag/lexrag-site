'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';

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
        bad: { label: 'Hallucinations in generic AI tools', img: '/media/technology/why-it-better-1.svg' },
        good: { label: 'Hallucinations in generic AI tools', img: '/media/technology/why-it-better-5.svg' },
    },
    {
        bad: { label: 'Keyword search misses legal context', img: '/media/technology/why-it-better-2.svg' },
        good: { label: 'Contextual accuracy across laws and case law', img: '/media/technology/why-it-better-6.svg' },
    },
    {
        bad: { label: 'LLM vendor lock-in', img: '/media/technology/why-it-better-3.svg' },
        good: { label: 'Any LLM or on-prem setup — full client control', img: '/media/technology/why-it-better-7.svg' },
    },
    {
        bad: { label: 'Black-box answers with no explanation', img: '/media/technology/why-it-better-4.svg' },
        good: {
            label: 'Transparent reasoning with citations — defensible in disputes',
            img: '/media/technology/why-it-better-8.svg',
        },
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
                    href="/benefits"
                >
                    See the benefits
                </Link>
                <Link
                    className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors text-axis-indigo"
                    href="https://app.lexrag.com/auth/signup"
                >
                    Register Free
                </Link>
            </div>
        </section>
    );
}

function Row({ bad, good }: { bad: { label: string; img: string }; good: { label: string; img: string } }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[42px]">
            <Link href={'/technology'} className="group flex items-stretch gap-4 cursor-pointer">
                <div
                    className={cx(
                        'grid place-items-center h-[102px] w-[102px] shrink-0 rounded-2xl p-[10px] shadow-sm bg-gradient-to-br from-[#FFEFE5] to-[#FF5C00]',
                    )}
                >
                    <Image src={bad.img} width={80} height={80} className="" alt="image" />
                </div>

                <div
                    className={cx(
                        'flex flex-1 items-center gap-3 rounded-[24px] px-5 py-4 ring-1 ring-white/30 shadow-sm backdrop-blur bg-[#FFEFE5] group-hover:bg-[#FF5C00] transition-colors max-w-[460px]',
                    )}
                >
                    <p
                        className={cx(
                            'text-base md:text-lg text-midnight-core group-hover:text-white transition-colors font-medium max-[420px]',
                        )}
                    >
                        {bad.label}
                    </p>
                </div>
            </Link>

            <Link href={'/technology'} className="group flex items-stretch gap-4 cursor-pointer">
                <div
                    className={cx(
                        'grid place-items-center h-[102px] w-[102px] shrink-0 rounded-2xl p-[10px] shadow-sm bg-gradient-to-br from-[#E6FCF1] to-phase-green',
                    )}
                >
                    <Image src={good.img} width={80} height={80} className="" alt="image" />
                </div>

                <div
                    className={cx(
                        'flex flex-1 items-center gap-3 rounded-[24px] px-5 py-4 ring-1 ring-white/30 shadow-sm backdrop-blur bg-[#E6FCF1] group-hover:bg-phase-green transition-colors max-w-[460px]',
                    )}
                >
                    <div className={cx('text-base md:text-lg text-emerald-800')}>
                        <p className="text-[16px] text-midnight-core font-medium group-hover:text-white transition-colors max-[420px]">
                            {good.label}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
