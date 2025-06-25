'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/api/auth/verifyEmail';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, LoaderCircleIcon } from 'lucide-react';
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
import ResendLink from '@/components/Auth/EmailVerification/ResendLink';

const formSchema = z.object({
  code: z.string().min(6, 'Please enter the verification code'),
});

export default function Page() {
  const router = useRouter();
  const params = useParams() as { email: string };
  const email = decodeURIComponent(params.email);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!email) {
      setError('Missing email in URL');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setMessage(null);

      const result = await verifyEmail({
        email,
        code: data.code,
      });

      if (!result.success) {
        return setError(result.error || 'Verification failed.');
      }

      router.push('/auth/signin');
    } catch (err) {
      console.log(err);
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
      <div className="w-full space-y-6 max-w-sm mx-auto">
        <h3 className="text-lg font-medium text-center m-3">
          Check your email
        </h3>
        <div className="text-2sm text-center text-gray-700 mb-7.5">
          Please enter the verification code sent to your email&nbsp;
          <a
            href="#"
            className="text-2sm font-medium hover:text-primary-active"
          >
            {email}
          </a>
          <br />
          to proceed. Thank you.
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {message && (
          <Alert>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the code sent to your email"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing && (
                <LoaderCircleIcon className="animate-spin mr-2 h-4 w-4" />
              )}
              Verify
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/auth/signin">Back to Login</Link>
            </Button>

            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-gray-600">
                Didn’t receive an email?
              </span>
              <ResendLink email={email} />
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
