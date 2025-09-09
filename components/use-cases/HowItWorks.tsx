'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidGlass from '../liquid-glass';

type Feature = {
    id: number;
    img: string;
    title: string;
    description: string;
    technology?: string;
    security?: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/service/how-it-works-1.svg',
        title: 'Ingest',
        description:
            'Import documents and trusted sources (PDFs, drives, URLs). System runs OCR, deduplication, chunking, metadata extraction.',
        technology: '/technology',
    },
    {
        id: 2,
        img: '/media/service/how-it-works-2.svg',
        title: 'Retrieve',
        description:
            'Hybrid search (vector + BM25) with [Graph-Vector] links and filters (date, jurisdiction, doc type).',
        technology: '/technology',
    },
    {
        id: 3,
        img: '/media/service/how-it-works-4.svg',
        title: 'Reason',
        description:
            'AI agents apply [RAG / Agents]: break down tasks, verify citations, enforce rules for predictable outputs.',
        technology: '/technology',
        security: '/security',
    },
    {
        id: 4,
        img: '/media/service/how-it-works-3.svg',
        title: 'Explain',
        description:
            'Show reasoning as user-friendly explanation: confidence + citations linked to sources. Powered by [Explainable AI].',
        technology: '/technology',
    },
    {
        id: 5,
        img: '/media/service/how-it-works-5.svg',
        title: 'Review & Edit',
        description:
            'Human-in-the-loop: accept/decline suggestions, edit text, add comments. Full audit trail and versioning.',
        technology: '/technology',
    },
    {
        id: 6,
        img: '/media/service/how-it-works-6.svg',
        title: 'Export',
        description: 'Generate memo/report (DOCX, PDF, JSON). Push results into workflows or templates via [Services].',
        technology: '/technology',
        security: '/security',
    },
];

function CardItem({
    feature,
    index,
    progress,
    prefersReduce,
    animated = true,
}: {
    feature: Feature;
    index: number;
    progress: MotionValue<number>;
    prefersReduce: boolean;
    animated?: boolean;
}) {
    const start = index * 0.12;
    const end = start + 0.22;

    const y = useTransform(progress, [start, end], prefersReduce ? [0, 0] : [56, 0]);
    const scale = useTransform(progress, [start, end], prefersReduce ? [1, 1] : [0.975, 1]);

    return (
        <motion.div
            style={{
                y: animated ? y : 0,
                scale: animated ? scale : 1,
                transformOrigin: 'bottom center',
            }}
            className="will-change-[transform] h-[392px]"
        >
            <div className="p-6 flex flex-col items-center rounded-3xl bg-gradient-to-br from-[#BBBCFA] to-[#694AFF] w-full h-[392px]">
                <div className="flex gap-8 mr-auto">
                    <span className="text-[64px]">{`0${index + 1}`}</span>
                    <Image
                        src={feature.img}
                        className="mb-4 mt-3 sm:w-[160px] sm:h-[160px] w-[120px] h-[120px]"
                        alt={feature.title}
                        width={160}
                        height={160}
                    />
                </div>

                <h6 className="font-semibold text-2xl mb-2 mr-auto">{feature.title}</h6>
                <p className="leading-[110%] font-normal mb-6 mr-auto h-12 text-[14px]">{feature.description}</p>

                <div className="flex flex-wrap justify-start w-full gap-[15px]">
                    {feature.technology && (
                        <Link
                            className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                            href={feature.technology}
                        >
                            Technology
                        </Link>
                    )}
                    {feature.security && (
                        <Link
                            className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                            href={feature.security}
                        >
                            Security
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function HowItWorks({ className }: { className: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 65%'],
    });

    return (
        <section ref={sectionRef} className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                How it works
            </h2>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

            <MobileHowItWorksSlider
                items={FEATURES}
                progress={scrollYProgress}
                prefersReduce={!!prefersReduce}
                className="md:hidden"
            />
        </section>
    );
}

function MobileHowItWorksSlider({
    items,
    progress,
    prefersReduce,
    className,
}: {
    items: Feature[];
    progress: MotionValue<number>;
    prefersReduce: boolean;
    className?: string;
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={className}>
            <div
                className="relative py-2 px-4 overflow-hidden"
                aria-roledescription="carousel"
                aria-label="How it works steps"
            >
                <div ref={emblaRef} className="overflow-hidden min-w-0">
                    <div className="flex gap-0">
                        {items.map((feature, i) => (
                            <div key={feature.id} className="shrink-0 grow-0 basis-full min-w-0">
                                <div className="px-1">
                                    <CardItem
                                        feature={feature}
                                        index={i}
                                        progress={progress}
                                        prefersReduce={prefersReduce}
                                        animated={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <LiquidGlass
                    className="group transition-all duration-200 hover:scale-105 w-[120px] mx-auto mt-6 mb-10"
                    centered={false}
                    compact
                    displacementScale={50}
                    blurAmount={0.01}
                    saturation={130}
                    aberrationIntensity={2}
                    elasticity={0.05}
                    cornerRadius={100}
                    mode="standard"
                    padding="8px 16px"
                    style={{ boxShadow: 'none', filter: 'none' }}
                >
                    <div className="flex justify-between w-[120px] px-2">
                        <button
                            aria-label="Previous"
                            onClick={() => emblaApi?.scrollPrev()}
                            disabled={!canPrev}
                            className="disabled:opacity-40"
                        >
                            <ChevronLeft className="h-6 w-6 text-axis-indigo" />
                        </button>

                        <button
                            aria-label="Next"
                            onClick={() => emblaApi?.scrollNext()}
                            disabled={!canNext}
                            className="disabled:opacity-40"
                        >
                            <ChevronRight className="h-6 w-6 text-axis-indigo" />
                        </button>
                    </div>
                </LiquidGlass>
            </div>
        </div>
    );
}
