'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import '@/components/ui/css-variables.css';
import AuthForm from './AuthForm';

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ open, onOpenChange, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

    const toggleMode = () => {
        setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md w-full max-w-sm mx-auto rounded-[24px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.30)_-1.72%,_rgba(255,255,255,0.60)_100%)]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-left text-[var(--Brand-Primary-Midnight-Core)]">
                        Get Started Now
                    </DialogTitle>
                </DialogHeader>
                <AuthForm mode={mode} onToggleMode={toggleMode} />
            </DialogContent>
        </Dialog>
    );
}
