'use client';

import Link from 'next/link';
import { capitalize } from '@/utils/capitalize';
import { formatDateMonth } from '@/utils/formatDate';
import { Download } from 'lucide-react';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { BillingsTableBodyProps } from '@/types/Billing';
import { statusColor } from '@/types/StatusColor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

const BillingsTableBody = ({ payments, columns }: BillingsTableBodyProps) => (
    <IntlProvider locale="en-US">
        <TableBody>
            {payments.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-muted-foreground border">
                        No invoices found.
                    </TableCell>
                </TableRow>
            ) : (
                payments.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell className="px-4 py-2 border border-b-0">{payment.id}</TableCell>
                        <TableCell className="px-4 py-2 border border-b-0">
                            <Badge
                                variant={statusColor[payment.status as keyof typeof statusColor]}
                                appearance="outline"
                                size="md"
                            >
                                {capitalize(payment.status)}
                            </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-2 border border-b-0">
                            {formatDateMonth(payment.created_at)}
                        </TableCell>
                        <TableCell className="px-4 py-2 border border-b-0">
                            {capitalize(payment.payment_method)}
                        </TableCell>
                        <TableCell className="px-4 py-2 border border-b-0">
                            <FormattedNumber
                                value={payment.amount / 100}
                                style="currency"
                                currency={payment.currency.toUpperCase()}
                            />
                        </TableCell>
                        <TableCell className="px-4 py-2 flex items-center justify-center border border-b-0">
                            <Link href={payment.invoice_hosted_url}>
                                <Button variant="outline" size="sm">
                                    <Download />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    </IntlProvider>
);

export default BillingsTableBody;
