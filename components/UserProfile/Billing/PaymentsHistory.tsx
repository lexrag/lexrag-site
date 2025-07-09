'use client';

import Link from 'next/link';
import { CloudDownload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import { BILLINGS } from '../constants/BILLINGS';
import PaymentsTable from './components/PaymentsTable';

const PaymentsHistory = () => {
    return (
        <CardWrapper
            title="Payments History"
            headerActions={
                <Button variant="secondary">
                    <CloudDownload /> Download all
                </Button>
            }
        >
            <PaymentsTable billings={BILLINGS} />
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Link href="/profile/billing/history">
                    <Button variant="link">View all payments</Button>
                </Link>
            </CardFooter>
        </CardWrapper>
    );
};

export default PaymentsHistory;
