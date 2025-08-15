'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (mode === 'signup') {
            if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters long';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!API_BASE) {
                setErrors({ form: 'API base URL is not configured' });
                return;
            }
            if (mode === 'signin') {
                const endpoint = `${API_BASE}/auth/signin`;
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setErrors({ form: data?.error || 'Sign in failed' });
                    return;
                }
                const appBase = process.env.NEXT_PUBLIC_APP_URL || 'https://app.lexrag.com';
                const signinPath = process.env.NEXT_PUBLIC_APP_SIGNIN_REDIRECT_PATH || '/';
                const redirectUrl = `${appBase}${signinPath}`;
                window.location.href = redirectUrl;

            } else {
                const endpoint = `${API_BASE}/auth/signup`;
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setErrors({ form: data?.error || 'Sign up failed' });
                    return;
                }
                try {
                    await fetch(`${API_BASE}/auth/send-code/${encodeURI(formData.email)}`, {
                        method: 'POST',
                    });
                } catch {}

                // After successful signup, redirect to app route that shows verify-email flow
                const appBase = process.env.NEXT_PUBLIC_APP_URL || 'https://app.lexrag.com';
                const signupPath = process.env.NEXT_PUBLIC_APP_SIGNUP_REDIRECT_PATH || '/auth/email-verification';
                const redirectUrl = `${appBase}${signupPath}/${encodeURI(formData.email)}`;
                window.location.href = redirectUrl;
            }
        } catch (err: any) {
            setErrors({ form: err?.message || 'Network error' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6 w-full">
                {mode === 'signup' && (
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-1 space-y-2 w-full">
                            <Label className="text-white" htmlFor="firstName">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                placeholder="Your First Name"
                                required
                                className='bg-transparent text-white border !border-white focus-visible:!border-white focus:text-white focus:placeholder-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none transition-colors transition-shadow duration-200'
                            />
                        </div>
                        <div className="flex flex-col gap-1 space-y-2 w-full">
                            <Label className="text-white" htmlFor="lastName">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                placeholder="Your Last Name"
                                required
                                className='bg-transparent text-white border !border-white focus-visible:!border-white focus:text-white focus:placeholder-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none transition-colors transition-shadow duration-200'
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-1 space-y-2 w-full">
                    <Label className="text-white" htmlFor="email">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                        className='bg-transparent text-white border !border-white focus-visible:!border-white focus:text-white focus:placeholder-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none transition-colors transition-shadow duration-200'
                    />
                </div>
                <div className="flex flex-col gap-1 space-y-2 w-full">
                    <Label className="text-white" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        required
                        className='bg-transparent text-white border !border-white focus-visible:!border-white focus:text-white focus:placeholder-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none transition-colors transition-shadow duration-200'
                    />
                </div>
                {mode === 'signup' && (
                    <div className="flex flex-col gap-1 space-y-2 w-full">
                        <Label className="text-white" htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm your password"
                            required
                            className='bg-transparent text-white border !border-white focus-visible:!border-white focus:text-white focus:placeholder-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none transition-colors transition-shadow duration-200'
                        />
                    </div>
                )}
                {mode === 'signup' && (
                    <div className="flex flex-col gap-1 space-y-2 w-full">
                        <TermsCheckbox
                            checked={formData.agreeToTerms}
                            onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                        />
                    </div>
                )}
                {errors.form && (
                    <div className="text-red-400 text-sm text-center">{errors.form}</div>
                )}
                <div className="mt-8 flex justify-center">
                    <ShinyButton
                        typeof="submit"
                        className="border-[0.1] border-white/50 hover:border-white/70 shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px]
                        bg-transparent hover:scale-105 hover:font-bold
                        transition-colors duration-200 text-white"
                    >
                        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                    </ShinyButton>
                </div>
            </form>

            <div className="w-full">
                <div className="flex justify-center">
                    <PSM>or</PSM>
                </div>
                <SocialAuthButtons />
            </div>

            <div className="mt-6 mb-10 text-center w-full">
                <p className="text-sm">
                    {mode === 'signup' ? 'Have an account?' : "Don't have an account?"}{' '}
                    <button onClick={onToggleMode} className="hover:underline cursor-pointer">
                        {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </>
    );
}
