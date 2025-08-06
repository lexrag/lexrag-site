'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { getLinkedinAuthLink } from '@/api/auth/getLinkedinAuthLink';
import { signIn } from '@/api/auth/signIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/common/icons';
import ReusableDialog from '@/components/common/ReusableDialog';
import Reset2FAModal from '@/components/UserProfile/Security/components/Reset2FAModal';
import TwoFactorVerifyStep from '@/components/UserProfile/Security/components/TwoFactorVerifyStep';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';
import { useSegment } from '@/hooks/use-segment';

export default function Page() {
    const router = useRouter();
    const { trackAuth, trackLinkedInConversion } = useSegment();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [pendingLogin, setPendingLogin] = useState<{ email: string; password: string } | null>(null);
    const [isOtpProcessing, setIsOtpProcessing] = useState(false);
    const [showReset2FAModal, setShowReset2FAModal] = useState(false);

    const form = useForm<SigninSchemaType>({
        resolver: zodResolver(getSigninSchema()),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const TwoFASchema = z.object({ otp_code: z.string().min(6, 'Enter a valid 2FA code') });
    type TwoFASchemaType = z.infer<typeof TwoFASchema>;
    const twoFAForm = useForm<TwoFASchemaType>({
        resolver: zodResolver(TwoFASchema),
        defaultValues: { otp_code: '' },
    });

    async function googleButtonOnClick() {
        trackAuth('sign_in', 'google', true);
        const result = await getGoogleAuthLink();
        if (result.success) {
            window.location.replace(result.redirect_url);
        }
    }

    async function linkedinButtonOnClick() {
        trackAuth('sign_in', 'linkedin', true);
        trackLinkedInConversion('signin');
        
        const result = await getLinkedinAuthLink();
        if (result.success) {
            window.location.replace(result.redirect_url);
        } else {
            console.error('Failed to get LinkedIn auth link:', result.error);
        }
    }

    async function onSubmit(values: SigninSchemaType) {
        setIsProcessing(true);
        setError(null);
        const { email, password } = values;

        const response = await signIn({ email: email.trim(), password: password.trim() });
        if (response?.error) {
            trackAuth('sign_in', 'email', false);
            if (response.status === 403) {
                setPendingLogin({ email, password });
                setShow2FAModal(true);
            } else if (response.error === 'Invalid OTP code' || response.error === 'Invalid otp code') {
                setPendingLogin({ email, password });
                setShow2FAModal(true);
            } else {
                setError(response.error);
            }
        } else {
            trackAuth('sign_in', 'email', true);
            router.push('/chat/new');
        }
        setIsProcessing(false);
    }

    async function on2FASubmit(values: TwoFASchemaType) {
        if (!pendingLogin) return;
        setIsOtpProcessing(true);
        const response = await signIn({
            email: pendingLogin.email.trim(),
            password: pendingLogin.password.trim(),
            otp_code: values.otp_code.trim(),
        });
        if (response?.error) {
            trackAuth('email_verification', 'email', false);
        } else {
            trackAuth('email_verification', 'email', true);
            setShow2FAModal(false);
            setPendingLogin(null);
            router.push('/chat/new');
        }
        setIsOtpProcessing(false);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-5">
                    <div className="text-center mb-2.5">
                        <h3 className="text-lg font-semibold leading-none mb-2.5">Sign in</h3>
                        <div className="flex items-center justify-center font-medium">
                            <span className="text-2sm text-gray-600 me-1.5">Need an account?</span>
                            <Link className="text-2sm link hover:text-primary" href="/auth/signup">
                                Sign up
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3.5">
                        <Button variant="outline" type="button" onClick={googleButtonOnClick}>
                            <Icons.googleColorful className="size-5! opacity-100!" /> Use Google
                        </Button>
                        <Button variant="outline" type="button" onClick={linkedinButtonOnClick}>
                            <Icons.linkedinColorfull className="size-5! opacity-100!" /> Use LinkedIn
                        </Button>
                    </div>

                    <div className="relative py-1.5">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">or</span>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertIcon>
                                <AlertCircle />
                            </AlertIcon>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center gap-2.5">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href="/auth/reset-password"
                                        className="text-2sm font-semibold text-foreground hover:text-primary"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Your password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        mode="icon"
                                        size="sm"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                                    >
                                        {passwordVisible ? (
                                            <EyeOff className="text-muted-foreground" />
                                        ) : (
                                            <Eye className="text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center space-x-2">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <>
                                    <Checkbox
                                        id="remember-me"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(!!checked)}
                                    />
                                    <label htmlFor="remember-me" className="text-sm leading-none text-muted-foreground">
                                        Remember me
                                    </label>
                                </>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <Button type="submit" disabled={isProcessing}>
                            {isProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
                            Sign in
                        </Button>
                    </div>
                </form>
            </Form>
            <ReusableDialog
                open={show2FAModal}
                onOpenChange={(open) => {
                    setShow2FAModal(open);
                    if (!open) {
                        twoFAForm.reset();
                    }
                }}
            >
                <TwoFactorVerifyStep
                    codeForm={twoFAForm}
                    loading={isOtpProcessing}
                    onBack={() => setShow2FAModal(false)}
                    onSubmit={on2FASubmit}
                    backLabel="Cancel"
                    submitLabel="Verify"
                    onReset={() => {
                        setShow2FAModal(false);
                        setShowReset2FAModal(true);
                    }}
                />
            </ReusableDialog>
            <Reset2FAModal
                open={showReset2FAModal}
                onOpenChange={setShowReset2FAModal}
                onBack={() => setShow2FAModal(true)}
                email={pendingLogin?.email || ''}
            />
        </>
    );
}
