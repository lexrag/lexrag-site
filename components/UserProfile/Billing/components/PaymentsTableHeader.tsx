import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PaymentsTableHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="min-w-52">Invoice</TableHead>
                <TableHead className="min-w-24 lg:text-end">Status</TableHead>
                <TableHead className="min-w-32 lg:text-end">Date</TableHead>
                <TableHead className="min-w-20 lg:text-end">Amount</TableHead>
                <TableHead className="w-8">Download</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default PaymentsTableHeader;
