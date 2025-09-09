'use client';

import { useRef } from 'react';
import VariableProximity from '../variable-proximity/VariableProximity';

export default function VariableProximityText() {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            className="relative max-w-[1200px] mx-auto mt-[75px] bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF99] border border-white p-4 md:p-10 md:px-[85px] rounded-3xl md:mb-[75px] mb-8 [--font-size-mobile:28px] [--font-size-desktop:54px]"
        >
            <VariableProximity
                label={'Verifiable answers for legal research, document review and case assessment.'}
                className={'variable-proximity-demo text-axis-indigo cursor-default text-left'}
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
    );
}
