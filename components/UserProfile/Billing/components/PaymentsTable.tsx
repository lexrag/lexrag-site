'use client';

import { Billing } from '@/types/Billing';
import { Table, TableBody } from '@/components/ui/table';
import PaymentRow from './PaymentRow';
import PaymentsTableHeader from './PaymentsTableHeader';

interface PaymentsTableProps {
    billings: Billing[];
    onDownload?: () => void;
}

const PaymentsTable = ({ billings, onDownload }: PaymentsTableProps) => {
    return (
        <div className="relative w-full overflow-auto">
            <Table className="w-full caption-bottom text-foreground text-sm">
                <PaymentsTableHeader />
                <TableBody>
                    {billings.slice(0, 3).map((billing) => (
                        <PaymentRow key={billing.billing} billing={billing} onDownload={onDownload} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PaymentsTable;
