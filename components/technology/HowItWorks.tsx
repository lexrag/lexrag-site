'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidGlass from '../liquid-glass';

type Step = {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
};

export type HowItWorksStepsProps = {
    items?: Step[];
    title?: string;
    className?: string;
};

const DEFAULT_STEPS: Step[] = [
    {
        id: 1,
        title: 'Ingest & Normalize',
        subtitle: 'загрузка, нормализация, метаданные',
        image: '/media/technology/how-it-works-1.svg',
    },
    {
        id: 2,
        title: 'Graph & Vectors',
        subtitle: 'связывание норм и прецедентов + эмбеддинги',
        image: '/media/technology/how-it-works-2.svg',
    },
    {
        id: 3,
        title: 'RAG Retrieval',
        subtitle: 'поиск авторитетных источников в реальном времени',
        image: '/media/technology/how-it-works-3.svg',
    },
    {
        id: 4,
        title: 'Reasoning w/ traces',
        subtitle: 'структурированное рассуждение с цитатами',
        image: '/media/technology/how-it-works-4.svg',
    },
    {
        id: 5,
        title: 'Integrations',
        subtitle: 'любая среда, отсутствие vendor lock-in',
        image: '/media/technology/how-it-works-5.svg',
    },
];

export default function HowItWorks({ items = DEFAULT_STEPS, title = 'How it works', className }: HowItWorksStepsProps) {
    return (
        <section className={cx('w-full  mx-auto', className)}>
            <h2 className="mb-6 text-4xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">{title}</h2>
            <Slider items={items} />
        </section>
    );
}

function Slider({ items }: { items: Step[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });

    const [index, setIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setIndex(emblaApi.selectedScrollSnap());
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
        <div className="relative py-8" aria-roledescription="carousel" aria-label="Steps">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-1 2xl:pl-[20%] xl:pl-[10%] pl-4 pr-1 pb-4">
                    {items.map((step, i) => (
                        <div
                            key={step.id}
                            className={cx(
                                'shrink-0 last:mr-2',
                                'basis-[85%] sm:basis-[60%] md:basis-[44%] lg:basis-[31%] xl:basis-[24%] 2xl:basis-[20%]',
                            )}
                        >
                            <ArticleCard step={step} isActive={i === index} indexLabel={String(step.id)} />
                        </div>
                    ))}
                </div>
            </div>

            <LiquidGlass
                className="group transition-all duration-200 hover:scale-105 w-[140px] mx-auto md:hidden"
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
                style={{
                    boxShadow: 'none',
                    filter: 'none',
                }}
            >
                <div className="flex justify-between w-[140px] px-5">
                    <button
                        aria-label="Previous"
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canPrev}
                        className=""
                    >
                        <ChevronLeft className="h-6 w-6 text-axis-indigo" />
                    </button>

                    <button aria-label="Next" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className="">
                        <ChevronRight className="h-6 w-6 text-axis-indigo" />
                    </button>
                </div>
            </LiquidGlass>

            <div className="max-w-[1200px] mx-auto pt-[52px] flex flex-col gap-6 items-start px-4">
                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-3 px-[36px] rounded-full transition-colors hover:opacity-85"
                    href="/technology"
                >
                    See step-by-step demo
                </Link>

                <Link className="text-axis-indigo transition-colors hover:opacity-85" href="/technology">
                    Why no vendor lock-in matters
                </Link>
            </div>
        </div>
    );
}

function ArticleCard({ step, indexLabel }: { step: Step; isActive: boolean; indexLabel: string }) {
    return (
        <div
            className={cx(
                'flex flex-col relative w-[292px] h-[336px] rounded-[24px] p-6 transition-all duration-300  bg-gradient-to-b to-[##EBF0FF] from-[#DADEEA] border border-white pb-',
            )}
        >
            <div className="text-5xl font-medium text-[#6D4CFF]">{indexLabel}</div>

            <Image src={step.image} className="mb-auto mt-1" width={150} height={150} alt="image" />

            <h3 className="text-2xl font-medium text-midnight-core">{step.title}</h3>
            {step.subtitle && <p className="text-[16px]/[110%] text-midnight-core">{step.subtitle}</p>}
        </div>
    );
}
