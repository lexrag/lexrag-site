'use client';

import React from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';

type Feature = {
    id: number;
    img: string;
    title: string;
    description: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/about/our-values-1.svg',
        title: 'Transparency',
        description: 'Every output backed by authoritative legal sources.',
    },
    {
        id: 2,
        img: '/media/about/our-values-2.svg',
        title: 'Explainability',
        description: 'Reasoning chains you can follow, not black-box results.',
    },
    {
        id: 3,
        img: '/media/about/our-values-3.svg',
        title: 'Trust & Security',
        description: 'On-premises deployment, enterprise-grade encryption, SG data-localization.',
    },
    {
        id: 4,
        img: '/media/about/our-values-4.svg',
        title: 'Accessibility',
        description: 'Freemium and Pay-as-you-go: no sales calls, no lock-in.',
    },
];

function CardItem({ feature }: { feature: Feature; index: number }) {
    return (
        <div className="md:gap-6 gap-3 flex md:flex-row flex-col">
            <div className="md:w-[102px] md:h-[102px] w-[80px] h-[80px] rounded-3xl p-4 bg-gradient-to-br to-phase-green from-[#67e3a5] flex items-center justify-center md:flex-shrink-0">
                <Image src={feature.img} width={65} height={67} className="md:w-[65px] md:h-[67px] w-[50px] h-[52px]" alt="icon" />
            </div>
            <div className="bg-[#E6FCF1] rounded-3xl md:p-5 p-4 flex md:flex-row flex-col md:items-center items-start flex-1 md:gap-4 gap-2">
                <p className="md:text-[20px] text-[18px] font-medium text-midnight-core md:w-[234px] w-full">{feature.title}</p>
                <span className="md:text-[20px] text-[16px] md:max-w-[714px] max-w-full font-medium text-midnight-core">{feature.description}</span>
            </div>
        </div>
    );
}

export default function OurValues({ className }: { className: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                Our Values
            </h2>

            <div className="md:mb-[75px] mb-8 flex flex-col gap-6">
                {FEATURES.map((f, i) => (
                    <CardItem key={f.id} feature={f} index={i} />
                ))}
            </div>
        </section>
    );
}
