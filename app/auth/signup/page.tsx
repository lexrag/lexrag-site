'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { getLinkedinAuthLink } from '@/api/auth/getLinkedinAuthLink';
import { sendVerificationCode } from '@/api/auth/sendVerificationCode';
import { signUp } from '@/api/auth/signUp';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/common/icons';
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Page() {
    const { trackAuth } = useAnalytics();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(false);

    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(getSignupSchema()),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            accept: false,
        },
    });

    async function googleButtonOnClick() {
        trackAuth('sign_up', 'google', true);
        const result = await getGoogleAuthLink();
        if (result.success) {
            window.location.replace(result.redirect_url);
        }
    }

    async function linkedinButtonOnClick() {
        trackAuth('sign_up', 'linkedin', true);
        const result = await getLinkedinAuthLink();
        if (result.success) {
            window.location.replace(result.redirect_url);
        }
    }

    const onSubmit = async (values: SignupSchemaType) => {
        setIsProcessing(true);
        setError(null);

        const { first_name, last_name, email, password } = values;

        const response = await signUp({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email,
            password,
        });

        if (!response.success) {
            trackAuth('sign_up', 'email', false);
            setError(response.error);
            return;
        }

        trackAuth('sign_up', 'email', true);

        const verificationCodeResult = await sendVerificationCode(email);

        if (!verificationCodeResult.success) {
            setError(verificationCodeResult.error);
        } else {
            redirect(`/auth/email-verification/${email}`);
        }
    };

    if (success) {
        return (
            <Alert onClose={() => setSuccess(false)}>
                <AlertIcon>
                    <Check />
                </AlertIcon>
                <AlertTitle>
                    You have successfully signed up! Please check your email to verify your account and then{' '}
                    <Link href="/auth/signin" className="text-primary hover:text-primary-darker">
                        Log in
                    </Link>
                    .
                </AlertTitle>
            </Alert>
        );
    }

    return (
        <Suspense>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-5">
                    <div className="text-center mb-2.5">
                        <h3 className="text-lg font-semibold leading-none mb-2.5">Sign up</h3>

                        <div className="flex flex-col sm:flex-row items-center justify-center font-medium">
                            <span className="text-2sm text-gray-600 me-1.5">Already have an Account ?</span>
                            <Link className="text-2sm link hover:text-primary" href="/auth/signin">
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3.5">
                        <Button variant="outline" type="button" onClick={googleButtonOnClick}>
                            <Icons.googleColorful className="size-4!" /> Use Google
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
                        <Alert variant="destructive" onClose={() => setError(null)}>
                            <AlertIcon>
                                <AlertCircle />
                            </AlertIcon>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                                <FormLabel>Password</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <div className="relative">
                                    <Input
                                        type={passwordConfirmationVisible ? 'text' : 'password'}
                                        {...field}
                                        placeholder="Confirm your password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        mode="icon"
                                        size="sm"
                                        onClick={() => setPasswordConfirmationVisible(!passwordConfirmationVisible)}
                                        className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                                        aria-label={
                                            passwordConfirmationVisible
                                                ? 'Hide password confirmation'
                                                : 'Show password confirmation'
                                        }
                                    >
                                        {passwordConfirmationVisible ? (
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
                            name="accept"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-2.5">
                                            <Checkbox
                                                id="accept"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(!!checked)}
                                            />

                                            <label
                                                htmlFor="accept"
                                                className="text-sm leading-none text-muted-foreground"
                                            >
                                                I accept
                                            </label>
                                            <Link
                                                href="/terms-and-conditions"
                                                target="_blank"
                                                className="-ms-0.5 text-sm font-semibold text-foreground hover:text-primary"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <Button type="submit" disabled={isProcessing}>
                            {isProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </Suspense>
    );
}
