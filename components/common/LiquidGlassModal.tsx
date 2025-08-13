'use client';

import { ReactNode, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import '@/css/themes/reui.css';
import LiquidGlass from '@/components/liquid-glass';

interface LiquidGlassModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    title?: string;
    maxWidth?: string;
    cornerRadius?: number;
    padding?: string;
    displacementScale?: number;
    blurAmount?: number;
    saturation?: number;
    aberrationIntensity?: number;
    elasticity?: number;
    mode?: 'prominent' | 'standard' | 'polar' | 'shader';
}

export default function LiquidGlassModal({
    open,
    onOpenChange,
    children,
    maxWidth = 'sm:max-w-md w-full max-w-sm',
    cornerRadius = 24,
    padding = '64px',
    displacementScale = 200,
    blurAmount = 0.0008,
    saturation = 130,
    aberrationIntensity = 0,
    elasticity = 0.02,
    mode = 'prominent',
}: LiquidGlassModalProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`bg-transparent border-0 p-0 ${maxWidth} mx-auto rounded-[${cornerRadius}px]`}>
                <div ref={containerRef} className="relative w-full">
                    <LiquidGlass
                        centered={false}
                        compact
                        displacementScale={displacementScale}
                        blurAmount={blurAmount}
                        saturation={saturation}
                        aberrationIntensity={aberrationIntensity}
                        elasticity={elasticity}
                        cornerRadius={cornerRadius}
                        mode={mode}
                        padding={padding}
                        mouseContainer={containerRef}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <div className="flex flex-col gap-6 text-white w-full items-center">{children}</div>
                    </LiquidGlass>
                </div>
            </DialogContent>
        </Dialog>
    );
}
