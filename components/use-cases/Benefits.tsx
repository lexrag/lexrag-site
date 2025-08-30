'use client';

import React, { useCallback, useEffect, useState, type ComponentType, type SVGProps } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react';
import LiquidGlass from '../liquid-glass';

type ListItem = {
    label: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type Section = {
    title: string;
    items: ListItem[];
};

const SECTIONS: Section[] = [
    {
        title: 'Benefits',
        items: [
            { label: 'Legal Accuracy', icon: CircleCheck },
            { label: 'No Hallucinations', icon: CircleCheck },
            { label: 'Explainable AI', icon: CircleCheck },
        ],
    },
    {
        title: 'Technology',
        items: [
            { label: 'Graph-Vector', icon: CircleCheck },
            { label: 'RAG Algorithm', icon: CircleCheck },
            { label: 'Security', icon: CircleCheck },
        ],
    },
    {
        title: 'Sibling Use Cases',
        items: [
            { label: 'Research', icon: CircleCheck },
            { label: 'Case Assessment', icon: CircleCheck },
        ],
    },
];

export default function Benefits({ className }: { className?: string }) {
    return (
        <div className={className ?? 'overflow-y-hidden'}>
            <div className="md:flex hidden gap-6 md:flex-nowrap flex-wrap">
                {SECTIONS.map(({ title, items }) => (
                    <BenefitsCard key={title} title={title} items={items} className="flex-1" />
                ))}
            </div>

            <MobileBenefitsSlider sections={SECTIONS} className="md:hidden" />
        </div>
    );
}

function MobileBenefitsSlider({ sections, className }: { sections: Section[]; className?: string }) {
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
            <div className="relative py-12 px-4 overflow-hidden" aria-roledescription="carousel" aria-label="Benefits">
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-0">
                        {sections.map((section) => (
                            <div key={section.title} className="shrink-0 grow-0 basis-full">
                                <div className="px-2">
                                    <BenefitsCard title={section.title} items={section.items} className="w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <LiquidGlass
                    className="group transition-all duration-200 hover:scale-105 w-[120px] mx-auto mt-4"
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

function BenefitsCard({
    title,
    items,
    className,
}: {
    title: string;
    items: ListItem[];
    className?: string;

    indexLabel?: string;
}) {
    return (
        <div
            className={[
                'bg-axis-indigo md:p-10 p-4 md:px-[85px] rounded-3xl min-h-[220px] md:block flex flex-col justify-center items-center',
                className ?? '',
            ].join(' ')}
        >
            <h6 className="mb-5 text-2xl">{title}</h6>
            <ul className="flex flex-col gap-2">
                {items.map(({ label, icon: Icon = CircleCheck }) => (
                    <li key={label} className="flex gap-2 items-center">
                        <Icon width={18} height={18} />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
