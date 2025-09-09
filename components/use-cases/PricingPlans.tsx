'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidGlass from '../liquid-glass';
import { LinkPrimary } from '../ui/link-primary';

type Plan = {
    name: string;
    price: string;
    priceNote: string;
    ctaText: string;
    ctaHref: string;
    ctaVariant?: 'outline';
    features: string[];
    badge?: string;
};

const SELECT_OPTIONS = ['Enterprice', 'Bussiness', 'Company'];

const PLANS: Plan[] = [
    {
        name: 'Freemium',
        price: '$0',
        priceNote: 'free forever',
        ctaText: 'Start for free',
        ctaHref: '/use-case',
        ctaVariant: 'outline',
        features: ['Increased event volume', 'Near real-time data', 'Email support', '99.95% uptime SLA'],
    },
    {
        name: 'Subscriptions',
        price: '$500',
        priceNote: 'per month / billed annually',
        ctaText: 'Create an account',
        ctaHref: '/use-case',
        features: ['Increased event volume', 'Near real-time data', 'Email support', '99.95% uptime SLA'],
        badge: 'Most popular',
    },
    {
        name: 'Pay as you go',
        price: '$1000',
        priceNote: 'for X credits',
        ctaText: 'Create an account',
        ctaHref: '/use-case',
        ctaVariant: 'outline',
        features: ['Increased event volume', 'Near real-time data', 'Email support', '99.95% uptime SLA'],
    },
    {
        name: 'Bundles',
        price: '$1500',
        priceNote: 'per month / billed annually',
        ctaText: 'Create an account',
        ctaHref: '/use-case',
        ctaVariant: 'outline',
        features: ['Increased event volume', 'Near real-time data', 'Email support', '99.95% uptime SLA'],
    },
];

function PlanCard({ plan }: { plan: Plan }) {
    return (
        <div
            className="bg-[#FFFFFF99] rounded-3xl relative overflow-hidden
                    w-[240px] xs:w-[260px] md:w-[280px]
                    px-4 md:px-5 pt-8 md:pt-[60px] pb-5 md:pb-[36px]"
        >
            <p className="text-[#303845] font-semibold text-base md:text-lg mb-3">{plan.name}</p>

            <div className="mt-2 md:mt-3">
                <select className="text-gray-500 outline-none px-2 py-1 border-black/25 border bg-white w-full text-sm md:text-base">
                    {SELECT_OPTIONS.map((opt) => (
                        <option key={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <h6 className="mt-6 md:mt-8 text-[36px] md:text-[48px] font-semibold text-[#303845]">{plan.price}</h6>
            <p className="text-[#303845] mb-4 md:mb-5 text-sm md:text-base">{plan.priceNote}</p>

            {plan.ctaVariant === 'outline' ? (
                <LinkPrimary variant="outline" href={plan.ctaHref} className="text-sm md:text-base">
                    {plan.ctaText}
                </LinkPrimary>
            ) : (
                <LinkPrimary href={plan.ctaHref} className="text-sm md:text-base">
                    {plan.ctaText}
                </LinkPrimary>
            )}

            <div className="mt-10 md:mt-20">
                <p className="text-[#303845] mb-2.5 md:mb-3 text-sm md:text-base">Includes:</p>
                <ul className="flex flex-col gap-2 md:gap-3">
                    {plan.features.map((feat) => (
                        <li key={feat} className="flex gap-3 md:gap-4">
                            <svg
                                className="text-axis-indigo mt-0.5"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M9 12l2 2 4-4" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span className="text-[#303845] text-sm md:text-base">{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {plan.badge && (
                <div className="absolute top-0 bg-static-lilac right-0 left-0 px-4 md:px-5 py-2">
                    <p className="text-[#303845] font-medium text-sm md:text-base">{plan.badge}</p>
                </div>
            )}
        </div>
    );
}

function PlanCardItem({
    plan,
    index,
    progress,
    prefersReduce,
    animated = true,
}: {
    plan: Plan;
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
            style={{ y: animated ? y : 0, scale: animated ? scale : 1, transformOrigin: 'bottom center' }}
            className="will-change-[transform]"
        >
            <PlanCard plan={plan} />
        </motion.div>
    );
}

export default function PricingPlans({ className }: { className?: string }) {
    const prefersReduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 92%', 'end 65%'],
    });

    return (
        <section ref={sectionRef} className={`${className}`}>
            <h2 className="mb-8 md:mb-[55px] text-[32px]/[110%] text-midnight-core md:text-[64px]/[110%]">
                Pricing plans for every team
            </h2>

            <div className="hidden md:flex justify-center flex-wrap lg:flex-nowrap gap-6">
                {PLANS.map((plan, i) => (
                    <PlanCardItem
                        key={plan.name}
                        plan={plan}
                        index={i}
                        progress={scrollYProgress}
                        prefersReduce={!!prefersReduce}
                    />
                ))}
            </div>

            <MobilePricingSlider
                items={PLANS}
                progress={scrollYProgress}
                prefersReduce={!!prefersReduce}
                className="md:hidden"
            />

            <div className="mt-3 md:mt-[52px] text-center mb-[55px]">
                <LinkPrimary href="/use-cases">Choose Your Plan</LinkPrimary>
            </div>
        </section>
    );
}

function MobilePricingSlider({
    items,
    progress,
    prefersReduce,
    className,
}: {
    items: Plan[];
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
                aria-label="Pricing plans"
            >
                <div ref={emblaRef} className="overflow-hidden min-w-0">
                    <div className="flex gap-0">
                        {items.map((plan, i) => (
                            <div key={plan.name} className="shrink-0 grow-0 basis-full min-w-0">
                                <div className="px-1 flex justify-center">
                                    <PlanCardItem
                                        plan={plan}
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
