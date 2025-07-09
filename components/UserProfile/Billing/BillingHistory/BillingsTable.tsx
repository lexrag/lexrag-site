'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { statusColor } from '@/types/StatusColor';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TablePagination from '@/components/UserProfile/components/TablePagination';
import { BILLINGS } from '@/components/UserProfile/constants/BILLINGS';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const BILLING_COLUMNS = [
    { key: 'billing', label: 'Billing', className: 'px-4 py-2', sortable: false },
    { key: 'status', label: 'Status', className: 'px-4 py-2', sortable: false },
    { key: 'date', label: 'Date', className: 'px-4 py-2', sortable: false },
    { key: 'due_to', label: 'Due To', className: 'px-4 py-2', sortable: false },
    { key: 'amount', label: 'Amount', className: 'px-4 py-2', sortable: false },
];

function formatDateMonth(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
}

const BillingsTable = () => {
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const filteredBillings = useMemo(() => {
        return BILLINGS.filter((billing) =>
            [billing.status, billing.date, billing.amount].join(' ').toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    const totalRows = filteredBillings.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginatedBillings = filteredBillings.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(Number(value));
        setPage(1);
    };

    return (
        <Card>
            <CardHeader className="p-4">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            className="ps-9 w-40"
                            placeholder="Search invoices..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            variant="md"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardTable>
                <Table className="min-w-[700px] rounded-lg border border-border bg-card shadow-xs">
                    <TableHeader>
                        <TableRow>
                            {BILLING_COLUMNS.map((col) => (
                                <TableHead
                                    key={col.key}
                                    className={col.className + ' text-left font-medium text-muted-foreground border'}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBillings.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={BILLING_COLUMNS.length}
                                    className="text-center text-muted-foreground border"
                                >
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBillings.map((billing, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="px-4 py-2 border">{billing.billing}</TableCell>
                                    <TableCell className="px-4 py-2 border">
                                        <Badge variant={statusColor[billing.status]} appearance="outline" size="md">
                                            {billing.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-2 border">{formatDateMonth(billing.date)}</TableCell>
                                    <TableCell className="px-4 py-2 border">
                                        {billing.due_to ? formatDateMonth(billing.due_to) : '-'}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 border">{billing.amount}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardTable>
            <CardFooter>
                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    totalRows={totalRows}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </CardFooter>
        </Card>
    );
};

export default BillingsTable;
