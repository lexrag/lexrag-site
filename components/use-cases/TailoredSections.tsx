'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidGlass from '../liquid-glass';
import { LinkPrimary } from '../ui/link-primary';

type CardDef = {
    img: string;
    title: string;
    list: string[];
    stat: string;
    desc: string;
    href?: string;
};

const CARDS: CardDef[] = [
    {
        img: '/media/use-case/tailored-1.svg',
        title: 'Solo Practitioners',
        list: ['Quick case law answers with citations', 'Generate memos in minutes', 'Research across jurisdictions'],
        stat: 'Save 5 hours per matter',
        desc: 'Answer client questions from your phone. Jennifer settled 3 claims in the first week.',
        href: '/services',
    },
    {
        img: '/media/use-case/tailored-2.svg',
        title: 'Law Firms',
        list: ['Team assignments & review workflows', 'Built-in quality controls', 'Export to DOCX or PDF'],
        stat: '10h saved per week',
        desc: 'Answer client questions from your phone. Jennifer settled 3 claims in the first week.',
        href: '/services',
    },
    {
        img: '/media/use-case/tailored-3.svg',
        title: 'In-house Legal',
        list: ['Reuse policy & precedent', 'Security & data residency', 'Share via PDF, Slack, Jira'],
        stat: '50+ hours saved annually',
        desc: 'Standardize research across the business. Acme achieved ROI within one quarter.',
        href: '/services',
    },
];

function CardItem({
    item,
    index,
    progress,
    prefersReduce,
    animated = true,
}: {
    item: CardDef;
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
            className="will-change-[transform] flex-1"
        >
            <div
                className="
          group flex h-full flex-col rounded-3xl
          bg-gradient-to-tl from-[#593EDC] to-[#593EDC8C]
          px-5 py-5 md:px-[47px] md:py-[42px]
        "
            >
                <div className="flex items-center gap-[14px] md:gap-[18px]">
                    <Image src={item.img} width={20} height={20} alt="" />
                    <h6 className="text-xl md:text-2xl font-semibold text-white">{item.title}</h6>
                </div>

                <ul className="mt-4 md:mt-5 space-y-2.5 md:space-y-3 text-white/90 pl-5 md:pl-[24px]">
                    {item.list.map((line) => (
                        <li key={line} className="flex items-start gap-3">
                            <span className="mt-1.5 md:mt-2 inline-block h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-white/80" />
                            <span className="text-[14px]/[1.45] md:text-[15px]/[1.4]">{line}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 md:mt-6">
                    <span
                        className="
              inline-flex items-center rounded-full bg-white
              px-4 md:px-5 py-1.5 md:py-2
              text-[14px] md:text-[15px] font-medium text-midnight-core shadow-sm
            "
                    >
                        {item.stat}
                    </span>
                </div>

                <p className="mt-4 md:mt-5 text-[14px]/[1.45] md:text-[15px]/[1.45] text-white">{item.desc}</p>

                <div className="mt-auto pt-6 text-center">
                    <LinkPrimary
                        className="text-white text-sm md:text-base"
                        href={item.href ?? '/services'}
                        variant="outline"
                    >
                        See Services
                    </LinkPrimary>
                </div>
            </div>
        </motion.div>
    );
}

export default function TailoredSections({ className }: { className?: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 45%'],
    });

    return (
        <section ref={sectionRef} className={className ?? ''}>
            <h2 className="mb-8 md:mb-[55px] text-[32px]/[110%] text-midnight-core md:text-[64px]/[110%]">
                Tailored Sections by Segment
            </h2>

            <div className="hidden md:flex flex-wrap items-stretch justify-center gap-6 xl:flex-nowrap">
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

            <MobileTailoredSlider
                items={CARDS}
                progress={scrollYProgress}
                prefersReduce={!!prefersReduce}
                className="md:hidden"
            />
        </section>
    );
}

function MobileTailoredSlider({
    items,
    progress,
    prefersReduce,
    className,
}: {
    items: CardDef[];
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
                aria-label="Tailored Sections"
            >
                <div ref={emblaRef} className="overflow-hidden min-w-0">
                    <div className="flex gap-0">
                        {items.map((item, i) => (
                            <div key={item.title} className="shrink-0 grow-0 basis-full min-w-0">
                                <div className="px-1">
                                    <CardItem
                                        item={item}
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
                    className="group transition-all duration-200 hover:scale-105 w-[120px] mx-auto mt-6 mb-12"
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
