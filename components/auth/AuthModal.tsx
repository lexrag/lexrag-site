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
            <DialogContent
                className="p-16 sm:max-w-md w-full max-w-sm mx-auto rounded-[24px] backdrop-blur-[200px] 
            border-[rgba(255,255,255,0.3)] bg-[rgba(178,173,173,0.30)]"
            >
                <DialogHeader>
                    <DialogTitle className="text-3xl font-semibold text-left text-[var(--Brand-Primary-Midnight-Core)]">
                        Get Started Now
                    </DialogTitle>
                </DialogHeader>
                <AuthForm mode={mode} onToggleMode={toggleMode} />
            </DialogContent>
        </Dialog>
    );
}
