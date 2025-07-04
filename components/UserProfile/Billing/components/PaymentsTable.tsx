'use client';

import { Invoice } from '@/types/Invoice';
import { Table, TableBody } from '@/components/ui/table';
import PaymentRow from './PaymentRow';
import PaymentsTableHeader from './PaymentsTableHeader';

interface PaymentsTableProps {
    invoices: Invoice[];
    onDownload?: (invoice: Invoice) => void;
}

const PaymentsTable = ({ invoices, onDownload }: PaymentsTableProps) => {
    return (
        <div className="relative w-full overflow-auto">
            <Table className="w-full caption-bottom text-foreground text-sm">
                <PaymentsTableHeader />
                <TableBody>
                    {invoices.map((invoice) => (
                        <PaymentRow
                            key={invoice.invoice}
                            invoice={invoice}
                            onDownload={onDownload ? () => onDownload(invoice) : undefined}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PaymentsTable;
