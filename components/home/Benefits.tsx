'use client';

import Image from 'next/image';
import { cx } from '@/utils/cx';
import ScrollStack, { ScrollStackItem } from '../scroll-stack-item/ScrollStackItem';

const CARDS: any[] = [
    {
        title: 'No AI Hallucinations',
        description: 'Court-ready answers',
        img: '/media/home/benefits-1.svg',
    },
    {
        title: 'Explainability & Traceability',
        description: 'Every citation verified',
        img: '/media/home/benefits-2.svg',
    },
    {
        title: 'Faster & Cheaper Workflows',
        description: '8h research → 15min result',
        img: '/media/home/benefits-3.svg',
    },
    {
        title: 'Peer Review & Expert Support',
        description: 'Instant second opinion',
        img: '/media/home/benefits-4.svg',
    },
    {
        title: 'Flexible Pricing',
        description: 'Pay only for what you use',
        img: '/media/home/benefits-5.svg',
    },
];

export default function Benefits() {
    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core">Benefits</h2>
            <ScrollStack useWindowScroll={true} className="">
                {CARDS.map((item, idx) => {
                    return (
                        <ScrollStackItem key={item.title}>
                            <div
                                className={cx(
                                    '"text-midnight-core bg-gradient-to-br  border-white border py-18 px-10 rounded-3xl flex gap-16"',
                                    idx % 2 === 0 ? 'from-[#77e0ab] to-[#06df72]' : 'from-[#d3d2d2] to-[#9f9e9e]',
                                )}
                            >
                                <div className="mr-auto">
                                    <h2 className="text-[40px] font-medium text-white">{item.title}</h2>
                                    <p className="text-[24px] text-white">{item.description}</p>
                                </div>

                                <div className="-translate-y-10">
                                    <Image src={item.img} width={150} height={150} alt="Image" />
                                </div>
                            </div>
                        </ScrollStackItem>
                    );
                })}
            </ScrollStack>
        </div>
    );
}
