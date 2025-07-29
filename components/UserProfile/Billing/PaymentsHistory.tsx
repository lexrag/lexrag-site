'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPaymentHistory } from '@/api/tariffs/getPaymentHistory';
import { Loader2 } from 'lucide-react';
import { Payment } from '@/types/PlansTable';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import PaymentsTable from './components/PaymentsTable';

const PaymentsHistory = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getPaymentHistory({
                    page: 1,
                    per_page: 3,
                });
                setPayments(Array.isArray(data.payments) ? data.payments : []);
            } catch (err) {
                console.error('Error fetching payment history:', err);
                setError(err instanceof Error ? err.message : 'Failed to load payment history');
                setPayments([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <CardWrapper title="Payments History">
            {loading ? (
                <div className="py-8 flex items-center justify-center text-muted-foreground">
                    <Loader2 className="w-10 h-10 animate-spin" />
                </div>
            ) : error ? (
                <div className="py-8 flex items-center justify-center text-red-500">
                    <span>Error: {error}</span>
                </div>
            ) : (
                <PaymentsTable payments={payments} />
            )}
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Link href="/profile/billing/history">
                    <Button variant="link">View all payments</Button>
                </Link>
            </CardFooter>
        </CardWrapper>
    );
};

export default PaymentsHistory;
