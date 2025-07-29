import Link from 'next/link';
import { capitalize } from '@/utils/capitalize';
import { formatDateMonth } from '@/utils/formatDate';
import { Download } from 'lucide-react';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { Payment } from '@/types/PlansTable';
import { statusColor } from '@/types/StatusColor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface PaymentRowProps {
    payment: Payment;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
    return (
        <IntlProvider locale="en-US">
            <TableRow>
                <TableCell className="text-sm text-foreground font-normal">{payment.id}</TableCell>
                <TableCell className="lg:text-end">
                    <Badge
                        variant={statusColor[payment.status as keyof typeof statusColor]}
                        appearance="outline"
                        size="md"
                    >
                        {capitalize(payment.status)}
                    </Badge>
                </TableCell>
                <TableCell className="text-sm text-foreground font-normal lg:text-end">
                    {formatDateMonth(payment.created_at)}
                </TableCell>
                <TableCell className="text-sm text-secondary-foreground font-normal lg:text-end">
                    <FormattedNumber
                        value={payment.amount / 100}
                        style="currency"
                        currency={payment.currency?.toUpperCase() || 'USD'}
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                    />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                    <Button variant="outline" size="icon" className="text-muted-foreground">
                        <Link href={payment.invoice_hosted_url}>
                            <Download className="w-5 h-5 text-blue-500" />
                        </Link>
                    </Button>
                </TableCell>
            </TableRow>
        </IntlProvider>
    );
};

export default PaymentRow;
