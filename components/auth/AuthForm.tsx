'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShinyButton } from '../magicui/shiny-button';
import { PSM } from '../ui/typography';
import SocialAuthButtons from './SocialAuthButtons';
import TermsCheckbox from './TermsCheckbox';

interface AuthFormProps {
    mode: 'signin' | 'signup';
    onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false,
    });

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { mode, formData });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {mode === 'signup' && (
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {mode === 'signup' && (
                    <TermsCheckbox
                        checked={formData.agreeToTerms}
                        onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    />
                )}
                <div className="flex justify-center">
                    <ShinyButton
                        typeof="submit"
                        className="border-[0.1] shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px] 
                        bg-[rgba(255,255,255,0.1)] hover:bg-[var(--Brand-Primary-Phase-Green)] 
                        transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]"
                    >
                        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                    </ShinyButton>
                </div>
            </form>

            <div className="mt-6">
                <div className="flex justify-center">
                    <PSM>Or</PSM>
                </div>
                <SocialAuthButtons />
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm">
                    {mode === 'signup' ? 'Have an account?' : "Don't have an account?"}{' '}
                    <button onClick={onToggleMode} className="text-[var(--Brand-Primary-Axis-Indigo)] hover:underline">
                        {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </>
    );
}
