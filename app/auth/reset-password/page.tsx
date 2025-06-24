'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { sendVerificationCode } from '@/api/auth/sendVerificationCode';
import { createAccessToken } from '@/utils/auth/createAccessToken';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, Check, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RecaptchaPopover } from '@/components/common/recaptcha-popover';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const codeSchema = z.object({
  code: z.string().min(4, 'Code is required'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(
      step === 1 ? emailSchema : step === 2 ? codeSchema : passwordSchema,
    ),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;

    if (step === 1) {
      setShowRecaptcha(true);
    } else {
      processStep();
    }
  };

  const processStep = async (recaptchaToken?: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(null);

      if (step === 1) {
        const email = form.getValues('email');

        const response = await sendVerificationCode(email);

        if (!response.error) {
          const errorData = JSON.parse(response.error);
          return setError(errorData.message);
        }

        setSuccess('Code sent to your email');
        setStep(2);
      }

      if (step === 2) {
        const { email, code } = form.getValues();

        setAccessToken(await createAccessToken({ sub: email }));

        setSuccess('Code verified');
        setStep(3);
      }

      if (step === 3) {
        const { email, code, password } = form.getValues();

        setSuccess('Password updated successfully');
        form.reset();
        setStep(1);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Suspense>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="block w-full space-y-5">
          <div className="text-center space-y-1 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Enter Code'}
              {step === 3 && 'Set New Password'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === 1 && 'Enter your email to receive a code.'}
              {step === 2 && 'Enter the code sent to your email.'}
              {step === 3 && 'Enter and confirm your new password.'}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" onClose={() => setError(null)}>
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {success && (
            <Alert onClose={() => setSuccess(null)}>
              <AlertIcon>
                <Check />
              </AlertIcon>
              <AlertTitle>{success}</AlertTitle>
            </Alert>
          )}

          {step === 1 && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {step === 2 && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter code"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        disabled={isProcessing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        disabled={isProcessing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 ? (
            <RecaptchaPopover
              open={showRecaptcha}
              onOpenChange={(open) => {
                if (!open) setShowRecaptcha(false);
              }}
              onVerify={(token) => {
                setShowRecaptcha(false);
                processStep(token);
              }}
              trigger={
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : null}
                  Submit
                </Button>
              }
            />
          ) : (
            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : null}
              Submit
            </Button>
          )}

          <div className="space-y-3">
            <Button type="button" variant="outline" className="w-full" asChild>
              <Link href="/auth/signin">
                <ArrowLeft className="size-3.5" /> Back
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </Suspense>
  );
}
