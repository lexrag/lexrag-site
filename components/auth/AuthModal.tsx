'use client';

import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import '@/components/ui/css-variables.css';
import AuthForm from './AuthForm';
import LiquidGlass from '@/components/liquid-glass';

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ open, onOpenChange, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleMode = () => {
        setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-transparent border-0 p-0 sm:max-w-md w-full max-w-sm mx-auto rounded-[24px]">
                <div ref={containerRef}>
                    <LiquidGlass
                        centered={false}
                        compact
                        displacementScale={64}
                        blurAmount={0.08}
                        saturation={130}
                        aberrationIntensity={2}
                        elasticity={0.02}
                        cornerRadius={24}
                        mode="prominent"
                        padding="64px"
                        mouseContainer={containerRef}
                    >
                        <div className="flex flex-col gap-6 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-semibold text-left text-[var(--Brand-Primary-Phase-Green)]">
                                    Get Started Now
                                </DialogTitle>
                            </DialogHeader>
                            <AuthForm mode={mode} onToggleMode={toggleMode} />
                        </div>
                    </LiquidGlass>
                </div>
            </DialogContent>
        </Dialog>
    );
}
