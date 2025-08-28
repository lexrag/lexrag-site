'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import LiquidGlass from '../liquid-glass';

type CardDef = {
    img: string;
    alt: string;
    label: string;
    href: string;
    mobileWidthClass?: string;
};

const CARDS: CardDef[] = [
    {
        img: '/media/technology/security-1.svg',
        alt: 'Enterprise-grade encryption',
        label: 'Enterprise-grade encryption',
        href: '/security',
        mobileWidthClass: 'w-[160px]',
    },
    {
        img: '/media/technology/security-2.svg',
        alt: 'SG data-localization',
        label: 'SG data-localization',
        href: '/security',
    },
    {
        img: '/media/technology/security-3.svg',
        alt: 'Compliance-ready',
        label: 'Compliance-ready',
        href: '/security',
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
            className="will-change-[transform] w-[284px] h-[167px] xl:h-[267px] xl:w-[384px]"
        >
            <LiquidGlass
                className="group w-[284px] h-[167px] xl:h-[267px] xl:w-[384px] hover:scale-[1.02]"
                centered={false}
                compact
                displacementScale={0}
                blurAmount={0.01}
                saturation={130}
                aberrationIntensity={2}
                elasticity={0.05}
                cornerRadius={30}
                mode="standard"
                padding="0"
                style={{
                    boxShadow: 'none',
                    filter: 'none',
                }}
            >
                <Link
                    href={item.href}
                    className={[
                        'pt-8 px-2 pb-4 md:pt-[45px] transition-colors h-[167px] xl:h-[267px] w-[284px]',
                        'rounded-[24px] flex flex-col items-center',

                        item.mobileWidthClass ?? '',
                    ].join(' ')}
                >
                    <Image
                        className="mb-5 xl:w-[120px] xl:h-[120px] w-[75px] h-[65px]"
                        src={item.img}
                        width={120}
                        height={120}
                        alt={item.alt}
                    />
                    <span className="text-midnight-core md:mb-[43px] text-center text-[14px] md:text-base">
                        {item.label}
                    </span>
                </Link>
            </LiquidGlass>
        </motion.div>
    );
}

export default function SecurityCompliance({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={`${className}`}>
            <h2 className="text-midnight-core text-[32px]/[110%] md:text-[64px]/[110%] mb-5">Security & Compliance</h2>
            <p className="text-midnight-core text-lg md:text-2xl mb-8 md:mb-[52px]">
                Deploy on-premises with full data control and compliance.
            </p>

            <div className="flex flex-wrap xl:flex-nowrap justify-center gap-6 items-center">
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
        </section>
    );
}
