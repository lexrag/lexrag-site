'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidGlass from '../liquid-glass';

type Feature = {
    id: number;
    title: string;
    list: string[] | string;
    media: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        title: 'Prompt:',
        list: 'Summarize recent case law on GDPR fines in the EU.',
        media: '/media/use-case/live-example.png',
    },
    {
        id: 2,
        title: 'Retrieved Sources:',
        list: ['Official EU GDPR enforcement database', 'Law firm blog analysis (2023)', 'Court ruling excerpts'],
        media: '/media/use-case/live-example.png',
    },
    {
        id: 3,
        title: 'Result (summarized):',
        list: 'AI generates a 3-paragraph memo highlighting top cases, fine amounts, and trends. Each point is linked back to original sources.',
        media: '/media/use-case/live-example.png',
    },
];

function CardItem({ feature, index }: { feature: Feature; index: number }) {
    return (
        <div className="group relative flex flex-col h-[504px] flex-1 md:hover:flex-1/3 transition-all overflow-hidden rounded-2xl">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={feature.media}
                    alt="example chat"
                    fill
                    className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
            </div>

            <div className="relative z-10 mt-auto p-4">
                <p className="text-midnight-core text-[64px]/[110%] mb-1">{`0${index + 1}`}.</p>
                <p className="font-semibold text-[16px] text-midnight-core">{feature.title}</p>

                {typeof feature.list !== 'string' ? (
                    <ul className="pl-6 list-disc h-[96px]">
                        {feature.list.map((item) => (
                            <li className="text-midnight-core leading-4" key={item}>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-midnight-core leading-4 h-[96px]">{feature.list}</p>
                )}
            </div>
        </div>
    );
}

export default function LiveExample({ className }: { className: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                Live Example
            </h2>

            <div className="hidden md:flex gap-6 overflow-visible">
                {FEATURES.map((f, i) => (
                    <CardItem key={f.id} feature={f} index={i} />
                ))}
            </div>

            <MobileLiveExampleSlider items={FEATURES} className="md:hidden" />
        </section>
    );
}

function MobileLiveExampleSlider({ items, className }: { items: Feature[]; className?: string }) {
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
                aria-label="Live Example"
            >
                <div ref={emblaRef} className="overflow-hidden min-w-0">
                    <div className="flex gap-0">
                        {items.map((feature, i) => (
                            <div key={feature.id} className="shrink-0 grow-0 basis-full min-w-0">
                                <div className="px-1">
                                    <CardItem feature={feature} index={i} />
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
