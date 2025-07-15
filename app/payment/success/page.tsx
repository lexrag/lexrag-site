'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { useEffect } from 'react';

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/profile/billing/plans');
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <CardWrapper title="Payment Successful" className="max-w-md mx-auto mt-10">
                <div className="flex flex-col items-center justify-center py-10 px-4">
                    <div className="mb-6">
                        <Image
                            height={128}
                            width={128}
                            src="/media/illustrations/1.svg"
                            alt="Success"
                            className="mb-4"
                            priority
                        />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Check className="text-green-500 w-8 h-8" />
                        <span className="text-2xl font-bold text-green-600">Success!</span>
                    </div>
                    <p className="text-center text-muted-foreground mb-6 max-w-xs">
                        Your payment was processed successfully. Thank you for your purchase!
                    </p>
                    <Button variant="primary" size="lg" className="w-full" onClick={() => router.push('/profile')}>
                        Go to Profile
                    </Button>
                </div>
            </CardWrapper>
        </div>
    );
}
