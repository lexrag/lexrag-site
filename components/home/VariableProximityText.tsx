'use client';

import { useCallback, useRef } from 'react';
import VariableProximity from '../variable-proximity/VariableProximity';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';

export default function VariableProximityText() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const confettiRef = useRef<ConfettiRef>(null);

    const handleMouseEnter = useCallback(() => {
        const fire = confettiRef.current?.fire;
        if (!fire) return;

        const bursts = [
            { particleCount: 160, spread: 75, startVelocity: 55, scalar: 1.0, origin: { x: 0.5, y: 1 } },
            { particleCount: 140, spread: 95, startVelocity: 60, scalar: 0.95, origin: { x: 0.5, y: 0.98 } },
            { particleCount: 180, spread: 85, startVelocity: 62, scalar: 1.05, origin: { x: 0.5, y: 1 } },
        ];

        bursts.forEach((opts, i) => {
            setTimeout(() => {
                fire(opts);
            }, i * 120);
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden max-w-[1200px] mx-auto mt-[75px] bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF99] border border-white p-4 md:p-10 md:px-[85px] rounded-3xl md:mb-[75px] mb-8 [--font-size-mobile:28px] [--font-size-desktop:54px] text-center"
            onMouseEnter={handleMouseEnter}
        >
            <div className="relative z-10">
                <VariableProximity
                    label={'We’re celebrating our Beta launch on September 10, 2025<br>with<br>three weeks of free access<br>to all features on our platform<br><br>Can’t wait to see you onboard!'}
                    className={'variable-proximity-demo text-axis-indigo cursor-default text-center'}
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 700"
                    containerRef={containerRef}
                    radius={100}
                    falloff="linear"
                    style={{
                        fontSize: 'clamp(var(--font-size-mobile), 5vw, var(--font-size-desktop))',
                    }}
                />
            </div>
            <Confetti
                ref={confettiRef}
                manualstart
                className="pointer-events-none absolute inset-0 z-0"
            />
        </div>
    );
}
