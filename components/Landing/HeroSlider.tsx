'use client';

import React, { useCallback, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import LiquidGlass from '@/components/liquid-glass';

type HeroSlide = {
  id: string;
  title: string;    // Accepts plain text with '<br>' or '\n'
  subtitle: string; // Accepts plain text with '<br>' or '\n'
};

// Helper: render strings with '<br>' or '\n' into line breaks safely
const renderWithBreaks = (text: string) => {
  const parts = text.split(/<br\s*\/?>|\n/g);
  return parts.map((part, idx) => (
    <React.Fragment key={idx}>
      {part}
      {idx < parts.length - 1 && <br />}
    </React.Fragment>
  ));
};


// Strong 3-word hero slides with optional <br> for line breaks
// Comments in English only

export const HERO_SLIDES: HeroSlide[] = [
    {
      id: '1',
      title: 'Court-Ready<br>Explainable AI',
      subtitle: 'every answer cited, no hallucinations<br>trust your legal insights',
    },
    {
      id: '2',
      title: 'Explore<br>Visual Legal Graph',
      subtitle: 'see statutes & cases mapped<br>drill into law sources',
    },
    {
      id: '3',
      title: 'Authoritative<br>Document Review',
      subtitle: 'instant summaries, flexibe templates<br>powerfull GraphRAG engine',
    },
    {
      id: '4',
      title: 'Interoperable<br>LLM Integrations',
      subtitle: 'your model in cloud or on-prem<br>API/MCP-ready, no lock-in',
    },
  ];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
      dragFree: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // No-op: reserved for future slide-specific logic
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
              <div
                key={slide.id}
                className="flex-[0_0_100%] w-screen min-w-0 px-10 xl:px-24 2xl:px-72"
              >
                <LiquidGlass
                  className="group w-full max-w-[801px] border border-white/15 rounded-[44px] overflow-hidden"
                  centered={false}
                  compact
                  displacementScale={150}
                  blurAmount={0.01}
                  saturation={100}
                  aberrationIntensity={2}
                  elasticity={0.05}
                  cornerRadius={30}
                  mode="standard"
                  padding="20px 20px"
                  style={{ boxShadow: 'none', filter: 'none' }}
                >
                  <div className="p-3 md:p-10">
                    <h1
                      className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-white"
                      style={{ fontFamily: 'Instrument Sans' }}
                    >
                      {renderWithBreaks(slide.title)}
                    </h1>
                    <h4
                      className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white font-normal"
                      style={{ fontFamily: 'Instrument Sans' }}
                    >
                      {renderWithBreaks(slide.subtitle)}
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