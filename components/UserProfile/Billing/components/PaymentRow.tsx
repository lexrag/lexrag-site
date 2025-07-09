import { Download } from 'lucide-react';
import { Billing } from '@/types/Billing';
import { statusColor } from '@/types/StatusColor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface PaymentRowProps {
    billing: Billing;
    onDownload?: () => void;
}

const PaymentRow = ({ billing, onDownload }: PaymentRowProps) => {
    return (
        <TableRow>
            <TableCell className="text-sm text-foreground font-normal">{billing.billing}</TableCell>
            <TableCell className="lg:text-end">
                <Badge variant={statusColor[billing.status]} appearance="outline" size="md">
                    {billing.status}
                </Badge>
            </TableCell>
            <TableCell className="text-sm text-foreground font-normal lg:text-end">{billing.date}</TableCell>
            <TableCell className="text-sm text-secondary-foreground font-normal lg:text-end">
                {billing.amount}
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
