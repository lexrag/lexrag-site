import { Download } from 'lucide-react';
import { Invoice } from '@/types/Invoice';
import { statusColor } from '@/types/StatusColor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface PaymentRowProps {
    invoice: Invoice;
    onDownload?: () => void;
}

const PaymentRow = ({ invoice, onDownload }: PaymentRowProps) => {
    return (
        <TableRow>
            <TableCell className="text-sm text-foreground font-normal">{invoice.invoice}</TableCell>
            <TableCell className="lg:text-end">
                <Badge variant={statusColor[invoice.status]} appearance="outline" size="md">
                    {invoice.status}
                </Badge>
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal lg:text-end">{invoice.date}</TableCell>
            <TableCell className="text-sm text-secondary-foreground font-normal lg:text-end">
                {invoice.amount}
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onDownload}>
                    <Download className="w-5 h-5 text-blue-500" />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default PaymentRow;
