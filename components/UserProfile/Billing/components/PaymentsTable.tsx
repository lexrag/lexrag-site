'use client';

import { Payment } from '@/types/PlansTable';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import PaymentRow from './PaymentRow';
import PaymentsTableHeader from './PaymentsTableHeader';

interface PaymentsTableProps {
    payments: Payment[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
    return (
        <div className="relative w-full overflow-auto">
            <Table className="w-full caption-bottom text-foreground text-sm">
                <PaymentsTableHeader />
                <TableBody>
                    {payments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground border">
                                No invoices found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        payments.map((payment) => <PaymentRow key={payment.id.toString()} payment={payment} />)
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default PaymentsTable;
