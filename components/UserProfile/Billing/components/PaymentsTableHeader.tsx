import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PaymentsTableHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="min-w-52">Invoice</TableHead>
                <TableHead className="min-w-24 text-end">Status</TableHead>
                <TableHead className="min-w-32 text-end">Date</TableHead>
                <TableHead className="min-w-20 text-end">Amount</TableHead>
                <TableHead className="w-8"></TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default PaymentsTableHeader;
