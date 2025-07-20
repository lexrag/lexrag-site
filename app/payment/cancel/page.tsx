'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';

export default function CancelPage() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/profile/billing/plans');
        }, 2000);
        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <CardWrapper title="Payment Canceled" className="max-w-md mx-auto mt-10">
                <div className="flex flex-col items-center justify-center py-10 px-4">
                    <div className="mb-6">
                        <Image
                            height={128}
                            width={128}
                            src="/media/illustrations/2.svg"
                            alt="Cancel"
                            className="mb-4 dark:hidden"
                            priority
                        />
                        <Image
                            height={128}
                            width={128}
                            src="/media/illustrations/2-dark.svg"
                            alt="Cancel"
                            className="mb-4 hidden dark:block"
                            priority
                        />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <X className="text-red-500 w-8 h-8" />
                        <span className="text-2xl font-bold text-red-600">Canceled!</span>
                    </div>
                    <p className="text-center text-muted-foreground mb-6 max-w-xs">
                        Your payment was canceled. Please try again.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push('/profile/billing/plans')}
                    >
                        Go to Plans
                    </Button>
                </div>
            </CardWrapper>
        </div>
    );
}
