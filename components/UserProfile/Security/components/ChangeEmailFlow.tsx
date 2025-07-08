'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEmailChangeCode } from '@/api/auth/getEmailChangeCode';
import { validatePassword } from '@/api/auth/validatePassword';
import { verifyEmailChangeCode } from '@/api/auth/verifyEmailChangeCode';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const passwordSchema = z.object({
    password: z.string().min(6, 'Enter your current password'),
});
const emailSchema = z.object({
    newEmail: z.string().email('Enter a valid email'),
});
const codeSchema = z.object({
    code: z.string().min(6, 'Enter the 6-digit code'),
});

const CODE_TTL = 60;

export default function ChangeEmailFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [newEmail, setNewEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [resendDisabledUntil, setResendDisabledUntil] = useState<number>(() => {
        const stored = localStorage.getItem('resendDisabledUntil');
        return stored ? parseInt(stored, 10) : 0;
    });
    const [now, setNow] = useState(Date.now());
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '' },
    });

    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { newEmail: '' },
    });

    const codeForm = useForm({
        resolver: zodResolver(codeSchema),
        defaultValues: { code: '' },
    });

    useEffect(() => {
        if (resendDisabledUntil > Date.now()) {
            timerRef.current = setInterval(() => setNow(Date.now()), 1000);
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [resendDisabledUntil]);

    const handlePasswordSubmit = async (data: { password: string }) => {
        setIsProcessing(true);
        try {
            const result = await validatePassword(data.password);
            if (result.error) {
                setIsProcessing(false);
                toast.error(result.error);
                return;
            }
            setStep(2);
            toast.success('Password validated');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('Failed to validate password');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleEmailSubmit = async (data: { newEmail: string }) => {
        setIsProcessing(true);
        try {
            const result = await getEmailChangeCode(data.newEmail);
            if (result.error) {
                setIsProcessing(false);
                toast.error(result.error || 'Failed to send code');
                return;
            }
            setNewEmail(data.newEmail);
            setStep(3);

            const unlockTime = Date.now() + CODE_TTL * 1000;
            localStorage.setItem('resendDisabledUntil', unlockTime.toString());
            setResendDisabledUntil(unlockTime);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('Failed to send code');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCodeSubmit = async (data: { code: string }) => {
        setIsProcessing(true);

        try {
            const result = await verifyEmailChangeCode(newEmail, data.code);
            if (result.error) {
                setIsProcessing(false);
                toast.error(result.error || 'Failed to verify code');
                return;
            }
            toast.success('Email changed successfully');
            localStorage.removeItem('resendDisabledUntil');
            localStorage.removeItem('token');
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('Failed to verify code');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const secondsLeft = Math.max(0, Math.ceil((resendDisabledUntil - now) / 1000));

    return (
        <div className="w-full max-w-sm mx-auto space-y-6">
            {step === 1 && (
                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                    <Input
                        type="password"
                        value={passwordForm.watch('password')}
                        onChange={(e) => passwordForm.setValue('password', e.target.value)}
                        disabled={isProcessing}
                        placeholder="Enter your password"
                    />
                    <Button type="submit" disabled={isProcessing} className="w-full">
                        Next
                    </Button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                    <Input
                        type="email"
                        value={emailForm.watch('newEmail')}
                        onChange={(e) => emailForm.setValue('newEmail', e.target.value)}
                        disabled={isProcessing}
                        placeholder="Enter new email"
                    />
                    <Button type="submit" disabled={isProcessing || secondsLeft > 0} className="w-full">
                        {secondsLeft > 0 ? `Wait ${secondsLeft}s` : 'Next'}
                    </Button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-4">
                    <div className="text-sm text-center mb-2">
                        Enter the code sent to your <b>new email</b>: <span className="font-mono">{newEmail}</span>
                    </div>
                    <Input
                        value={codeForm.watch('code')}
                        onChange={(e) => codeForm.setValue('code', e.target.value)}
                        disabled={isProcessing}
                        placeholder="Enter code"
                    />
                    <Button type="submit" disabled={isProcessing} className="w-full">
                        Change Email
                    </Button>
                </form>
            )}
        </div>
    );
}
