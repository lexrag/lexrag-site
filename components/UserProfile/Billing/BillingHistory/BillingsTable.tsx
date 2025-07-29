'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getPaymentHistory } from '@/api/tariffs/getPaymentHistory';
import { Loader2, Search } from 'lucide-react';
import { Payment } from '@/types/PlansTable';
import { statusColor } from '@/types/StatusColor';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import TablePagination from '@/components/UserProfile/components/TablePagination';
import BillingsTableBody from './components/BillingsTableBody';
import BillingsTableHeader from './components/BillingsTableHeader';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
const STATUS_OPTIONS = Object.keys(statusColor);
const DEFAULT_PAYMENT_METHODS = ['card', 'paypal', 'stripe'];

const BILLING_COLUMNS = [
    { key: 'id', label: 'Payment', className: 'w-1/4' },
    { key: 'status', label: 'Status', className: 'w-1/4' },
    { key: 'date', label: 'Date', className: 'w-1/4' },
    { key: 'payment', label: 'Payment Method', className: 'w-1/4' },
    { key: 'amount', label: 'Amount', className: 'w-1/4' },
    { key: 'download', label: 'Download', className: 'w-1/4' },
];

const BillingsTable = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPayments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPaymentHistory({
                page,
                per_page: rowsPerPage,
                status: status || undefined,
                payment_method: paymentMethod || undefined,
            });
            setPayments(Array.isArray(data.payments) ? data.payments : []);
            setTotalRows(data.total || 0);
            setTotalPages(data.total_pages || 1);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setPayments([]);
            setTotalRows(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, status, paymentMethod]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const filteredPayments = useMemo(() => {
        if (!search) return payments;
        return payments.filter((p) =>
            [p.status, p.created_at, p.amount, p.description, p.payment_method]
                .join(' ')
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [payments, search]);

    const paymentMethodOptions = useMemo(() => {
        const methods = Array.from(new Set(payments.map((p) => p.payment_method).filter(Boolean) as string[]));
        return methods.length > 0 ? methods : DEFAULT_PAYMENT_METHODS;
    }, [payments]);

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
                            onChange={(e) => setSearch(e.target.value)}
                            variant="md"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardTable>
                <Table className="min-w-[700px] rounded-lg border border-border bg-card shadow-xs">
                    <TableHeader>
                        <BillingsTableHeader
                            columns={BILLING_COLUMNS}
                            statusOptions={STATUS_OPTIONS}
                            paymentMethodOptions={paymentMethodOptions}
                            status={status}
                            paymentMethod={paymentMethod}
                            onStatusChange={(val) => {
                                setStatus(val);
                                setPage(1);
                            }}
                            onPaymentMethodChange={(val) => {
                                setPaymentMethod(val);
                                setPage(1);
                            }}
                        />
                    </TableHeader>
                    {loading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={BILLING_COLUMNS.length} className="py-12 text-center">
                                    <Loader2 className="w-10 h-10 mx-auto animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <BillingsTableBody payments={filteredPayments} columns={BILLING_COLUMNS} />
                    )}
                </Table>
            </CardTable>
            <CardFooter>
                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    totalRows={totalRows}
                    onPageChange={setPage}
                    onRowsPerPageChange={(val) => {
                        setRowsPerPage(Number(val));
                        setPage(1);
                    }}
                />
            </CardFooter>
        </Card>
    );
};

export default BillingsTable;
