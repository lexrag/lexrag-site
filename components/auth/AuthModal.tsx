'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import '@/components/ui/css-variables.css';

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ open, onOpenChange, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
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
        // TODO: Implement authentication logic
        console.log('Form submitted:', { mode, formData });
    };

    const toggleMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setFormData({ name: '', email: '', password: '', agreeToTerms: false });
    };

    const handleSocialAuth = (provider: 'google' | 'linkedin') => {
        // TODO: Implement social authentication
        console.log(`${provider} authentication clicked`);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md w-full max-w-sm mx-auto rounded-[24px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.30)_-1.72%,_rgba(255,255,255,0.60)_100%)]">
                <DialogHeader className="relative">
                    <DialogTitle className="text-2xl font-semibold text-left text-[var(--Brand-Primary-Midnight-Core)]">
                        Get Started Now
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    {mode === 'signup' && (
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required={mode === 'signup'}
                                className="h-11 rounded-[30px] border border-white"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="h-11 rounded-[30px] border border-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                            className="h-11 rounded-[30px] border border-white"
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                                required
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                                I agree to the{' '}
                                <a
                                    href="/terms-and-conditions/terms-conditions"
                                    className="text-[var(--Brand-Primary-Axis-Indigo)] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms & Conditions
                                </a>{' '}
                                and{' '}
                                <a
                                    href="/terms-and-conditions/privacy-policy"
                                    className="text-[var(--Brand-Primary-Axis-Indigo)] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                            </Label>
                        </div>
                    )}
                    <div className='flex justify-center'>
                        <Button
                            type="submit"
                            className="w-1/2 h-11 bg-[linear-gradient(180deg,_rgba(255,255,255,0.30)_-1.72%,_rgba(255,255,255,0.60)_100%)] 
                        text-[var(--Brand-Primary-Midnight-Core)] font-medium rounded-lg transition-colors"
                        >
                            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11 border-gray-300 hover:bg-gray-50"
                            onClick={() => handleSocialAuth('google')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign in with Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11 border-gray-300 hover:bg-gray-50"
                            onClick={() => handleSocialAuth('linkedin')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0077B5">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            Sign in with LinkedIn
                        </Button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {mode === 'signup' ? 'Have an account?' : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-[var(--Brand-Primary-Axis-Indigo)] hover:underline font-medium"
                        >
                            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
