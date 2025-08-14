'use client';

import { useState, useEffect } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LiquidGlassModal from '@/components/common/LiquidGlassModal';
import AuthForm from './AuthForm';

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ open, onOpenChange, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [open]);

    const toggleMode = () => {
        setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    };

    return (
        <LiquidGlassModal open={open} onOpenChange={onOpenChange} isVisible={isVisible}>
            <DialogHeader className="w-full text-center">
                <DialogTitle className="text-3xl font-semibold text-center text-white w-full">
                    Get Started Now
                </DialogTitle>
            </DialogHeader>
            <AuthForm mode={mode} onToggleMode={toggleMode} />
        </LiquidGlassModal>
    );
}
