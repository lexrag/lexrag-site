'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { signIn } from '@/api/auth/signIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/common/icons';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';

export default function Page() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<SigninSchemaType>({
        resolver: zodResolver(getSigninSchema()),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    async function googleButtonOnClick() {
        const result = await getGoogleAuthLink();
        if (result.success) {
            window.location.replace(result.redirect_url);
        }
    }

    async function onSubmit(values: SigninSchemaType) {
        setIsProcessing(true);
        setError(null);

        const { email, password } = values;

        const response = await signIn({
            email: email.trim(),
            password: password.trim(),
        });
        if (response?.error) {
            setError(response.error);
        } else {
            router.push('/chat/new');
        }

        setIsProcessing(false);
    }

    return (
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
                    <Button variant="outline" type="button">
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
                        Sign In
                    </Button>
                </div>
            </form>
        </Form>
    );
}
