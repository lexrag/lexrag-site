'use client';

import React, { useCallback, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import LiquidGlass from '@/components/liquid-glass';

type HeroSlide = {
    id: string;
    title: string;
    subtitle: string;
};

const HERO_SLIDES: HeroSlide[] = [
    {
        id: '1',
        title: 'Explainable Legal AI (Assistant / Platform)',
        subtitle: 'Built in Singapore for real practice',
    },
    {
        id: '2',
        title: 'Explainable Legal AI (Assistant / Platform)',
        subtitle: 'Built in Singapore for real practice',
    },
    {
        id: '3',
        title: 'Explainable Legal AI (Assistant / Platform)',
        subtitle: 'Built in Singapore for real practice',
    },
];

export default function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            duration: 30,
            dragFree: false,
        },
        [Autoplay({ delay: 3000, stopOnInteraction: false })],
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="w-full overflow-hidden">
            <div className="overflow-hidden">
                <div ref={emblaRef} className="py-16">
                    <div className="flex">
                        {HERO_SLIDES.map((slide) => (
                            <div key={slide.id} className="flex-[0_0_100%] w-screen min-w-0 px-10 xl:px-24 2xl:px-96">
                                <LiquidGlass
                                    className="group w-full max-w-[801px] border border-white/50 rounded-3xl"
                                    centered={false}
                                    compact
                                    displacementScale={0}
                                    blurAmount={0.01}
                                    saturation={100}
                                    aberrationIntensity={2}
                                    elasticity={0.05}
                                    cornerRadius={30}
                                    mode="standard"
                                    padding="8px 16px"
                                    style={{
                                        boxShadow: 'none',
                                        filter: 'none',
                                    }}
                                >
                                    <div className="p-3 md:p-10">
                                        <h1
                                            className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-white"
                                            style={{
                                                fontFamily: 'Instrument Sans',
                                            }}
                                        >
                                            {slide.title}
                                        </h1>
                                        <h4
                                            className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white font-normal"
                                            style={{
                                                fontFamily: 'Instrument Sans',
                                            }}
                                        >
                                            {slide.subtitle}
                                        </h4>
                                    </div>
                                </LiquidGlass>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
