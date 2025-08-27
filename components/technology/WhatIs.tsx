'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';

type Feature = {
    id: number;
    title: string;
    tagline?: string;
    description: string;
    href?: string;
    linkText?: string;
    img: string;
};

const DEFAULT_FEATURES: Feature[] = [
    {
        id: 1,
        title: 'Graph-Vector Engine',
        tagline: 'Context, not keywords',
        description:
            'Only official & authoritative sources. Graph maps legal relationships in acts, subsidiary legislation, and case law. Vectors provide semantic understanding of provisions and concepts. Thanks to this structure, every reasoning step is traceable, with sources and legal links.',
        href: '/why-explainability',
        linkText: 'Why explainability matters',
        img: '/media/technology/technology-1.svg',
    },
    {
        id: 2,
        title: 'RAG Retrieval',
        tagline: 'Always authoritative',
        description:
            'Retrieves the most relevant legal contexts (via vectors) and enriches them with related provisions (via graph) — ensuring authoritative, verifiable answers.',
        href: '/tech/rag',
        linkText: 'See step-by-step demo',
        img: '/media/technology/technology-2.svg',
    },
    {
        id: 3,
        title: 'Bidirectional Prompting',
        tagline: 'Arguments you can verify',
        description:
            'The system asks clarifying legal questions to close information gaps, like a human lawyer would. Multi-chain agents simulate different professional roles to refine the query before producing the answer.',
        href: '/tech/bidirectional',
        linkText: 'How Graph-Vector works in LEXRAG',
        img: '/media/technology/technology-3.svg',
    },
    {
        id: 4,
        title: 'Interoperable LLMs',
        tagline: 'No vendor lock-in',
        description:
            'Works with any LLM (cloud or on-premises). Clients retain control — no lock-in, maximum flexibility.',
        href: '/tech/llms',
        linkText: 'Why no vendor lock-in matters',
        img: '/media/technology/technology-4.svg',
    },
    {
        id: 5,
        title: 'Secure On-Premises Deployment',
        tagline: 'Compliance by design',
        description:
            'Enterprise-grade encryption and compliance. Deploy fully on client’s own infrastructure with Singapore-localized data control.',
        href: '/security/on-prem',
        linkText: 'Read our Security approach',
        img: '/media/technology/technology-6.svg',
    },
    {
        id: 6,
        title: 'API & Integrations',
        tagline: 'Plug into your tools',
        description: 'Connects to CRM, DMS and other systems. Available API/MCP, plugins  or standalone platform.',
        href: '/docs/api',
        linkText: 'API integration guide',
        img: '/media/technology/technology-5.svg',
    },
];

export type TechnologyTabsProps = {
    items?: Feature[];
    initialIndex?: number;
    className?: string;
};

export default function WhatIs({ items = DEFAULT_FEATURES, initialIndex = 0, className }: TechnologyTabsProps) {
    const [index, setIndex] = useState(() => Math.min(Math.max(initialIndex, 0), items.length - 1));
    const active = items[index];

    return (
        <section className={cx('w-full mb-[75px]', className)}>
            <h2 className="text-midnight-core text-[28px] md:text-[64px] mb-[52px]">What is it</h2>

            <div className="flex gap-6 flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-4 flex-1">
                    {items.map((it, i) => {
                        const isActive = i === index;
                        const panelId = `feature-panel-${it.id}`;

                        return (
                            <div key={it.id} className="w-full">
                                <button
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={panelId}
                                    aria-expanded={isActive}
                                    onClick={() => setIndex(i)}
                                    className={cx(
                                        'group relative isolate flex w-full items-center gap-[15px] rounded-2xl px-5 py-5 text-left',
                                        'bg-white/70 focus:bg-white cursor-pointer',
                                        'transition-[transform,box-shadow] duration-300 ease-out will-change-transform',
                                        isActive ? 'shadow-lg' : 'hover:shadow-md',

                                        'before:absolute before:inset-0 before:-z-10 before:rounded-2xl',
                                        'before:bg-gradient-to-b before:from-[#BBBCFA] before:to-[#694AFF]',
                                        'before:opacity-0 before:transition-opacity before:duration-300 before:ease-out',
                                        isActive ? 'before:opacity-100' : 'hover:before:opacity-100',
                                    )}
                                >
                                    <span
                                        className={cx(
                                            'relative z-10 font-normal tabular-nums transition-colors duration-300',
                                            'text-3xl md:text-5xl',
                                            isActive
                                                ? 'text-white drop-shadow-sm'
                                                : 'text-phase-green group-hover:text-white',
                                        )}
                                    >
                                        {String(it.id).padStart(2, '0')}
                                    </span>

                                    <span
                                        className={cx(
                                            'relative z-10 font-medium transition-colors duration-300',
                                            'text-base md:text-xl',
                                            isActive
                                                ? 'text-white/95 cursor-default'
                                                : 'text-midnight-core group-hover:text-white',
                                        )}
                                    >
                                        {it.title}
                                    </span>
                                </button>

                                <div
                                    id={panelId}
                                    className={cx(
                                        'md:hidden grid transition-[grid-template-rows,margin] duration-300 ease-out',
                                        isActive ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr] mt-0',
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <article className="relative w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#C8B7FF] to-[#694AFF] p-5 text-white shadow-md">
                                            <div className="flex gap-3 items-start font-semibold text-phase-green select-none">
                                                <span className="w-16 font-normal text-[36px] md:text-[48px]">
                                                    {String(it.id).padStart(2, '0')}
                                                </span>
                                                <Image
                                                    src={it.img}
                                                    width={120}
                                                    height={120}
                                                    alt=""
                                                    className="h-[80px] w-auto"
                                                />
                                            </div>

                                            <div className={cx('mt-4', isActive && 'animate-panel')}>
                                                <h3 className="font-medium leading-tight text-[18px] md:text-[24px]">
                                                    {it.title}
                                                </h3>
                                                {it.tagline && (
                                                    <p className="mt-3 font-medium text-base md:text-lg">
                                                        {it.tagline}
                                                    </p>
                                                )}

                                                <p className="mt-3 text-[14px]/[120%] md:text-[15px]/[120%]">
                                                    {it.description}
                                                </p>

                                                {it.href && (
                                                    <Link
                                                        href={it.href}
                                                        className="mt-4 inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 text-[14px]/[120%] md:text-[15px]/[120%]"
                                                    >
                                                        <span>{it.linkText ?? 'Learn more'}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    role="tabpanel"
                    aria-labelledby={`feature-${active.id}`}
                    className="relative w-full md:w-[693px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#C8B7FF] to-[#694AFF] p-6 text-white shadow-xl hidden md:block"
                >
                    <div className="flex gap-3 items-start text-5xl font-semibold text-phase-green select-none">
                        <span className="text-[64px] w-20 font-normal">{String(active.id).padStart(2, '0')}</span>
                        <Image src={active.img} width={200} height={200} alt="" />
                    </div>

                    <div key={active.id} className="mt-6 max-w-[720px] animate-panel">
                        <h2 className="text-[36px] font-medium leading-tight">{active.title}</h2>
                        {active.tagline && <p className="mt-6 font-medium text-2xl">{active.tagline}</p>}
                        <p className="mt-6 text-[16px]/[110%]">{active.description}</p>

                        {active.href && (
                            <Link
                                href={active.href}
                                className="mt-6 inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 text-[16px]/[110%]"
                            >
                                <span>{active.linkText ?? 'Learn more'}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
