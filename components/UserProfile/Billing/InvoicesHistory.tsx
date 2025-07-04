'use client';

import { CloudDownload } from 'lucide-react';
import { Invoice } from '@/types/Invoice';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import PaymentsTable from './components/PaymentsTable';

const invoices: Invoice[] = [
    {
        invoice: 'INV-001',
        status: 'Paid',
        date: '2021-01-01',
        amount: '$100',
    },
    {
        invoice: 'INV-002',
        status: 'Pending',
        date: '2021-01-02',
        amount: '$200',
    },
    {
        invoice: 'INV-003',
        status: 'Failed',
        date: '2021-01-03',
        amount: '$300',
    },
];

const InvoicesHistory = () => {
    return (
        <CardWrapper
            title="Invoices History"
            headerActions={
                <Button variant="secondary">
                    <CloudDownload /> Download all
                </Button>
            }
        >
            <PaymentsTable invoices={invoices} />
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Button variant="link">Download all invoices</Button>
            </CardFooter>
        </CardWrapper>
    );
};

export default InvoicesHistory;
