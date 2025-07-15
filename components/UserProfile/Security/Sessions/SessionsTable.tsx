'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DeviceTableHeader from '../../components/TableHeader';
import TablePagination from '../../components/TablePagination';
import { getSessions } from '@/api/user/getSessions';
import { LoginSession } from '@/types/Session';
import { formatDistanceToNow } from 'date-fns';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const SESSION_COLUMNS = [
    { key: 'ip', label: 'IP', className: 'px-4 py-2', sortable: true },
    { key: 'device', label: 'Device', className: 'px-4 py-2', sortable: true },
    { key: 'last_seen', label: 'Last Seen', className: 'px-4 py-2', sortable: true },
];

const SessionsTable = () => {
    const [search, setSearch] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sessions, setSessions] = useState<LoginSession[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            const response = await getSessions(rowsPerPage, (page - 1) * rowsPerPage);
            setSessions(response?.sessions || []);
            setLoading(false);
        })();
    }, [rowsPerPage, page]);

    const filteredSessions = useMemo(() => {
        if (!sessions) return [];
        if (!search) return sessions;
        return sessions.filter((session) =>
            [session.ip_address, session.device, session.last_seen].join(' ').toLowerCase().includes(search.toLowerCase()),
        );
    }, [sessions, search]);

    const totalRows = sessions?.length || 0;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

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
                            placeholder="Search sessions..."
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
                <Table className="min-w-[500px] rounded-lg border border-border bg-card shadow-xs">
                    <DeviceTableHeader
                        columns={SESSION_COLUMNS}
                        allSelected={false}
                        sortState={undefined}
                        onSort={undefined}
                        headerCheckboxRef={undefined}
                    />
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    Loading sessions...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-destructive">
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : filteredSessions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    No sessions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSessions.map((session, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="px-4 py-2">{session.ip_address}</TableCell>
                                    <TableCell className="px-4 py-2">{session.device}</TableCell>
                                    <TableCell className="px-4 py-2">{formatDistanceToNow(new Date(session.last_seen), { addSuffix: true })}</TableCell>
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

export default SessionsTable;
