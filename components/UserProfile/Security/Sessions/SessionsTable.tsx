'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DeviceTableHeader from '../../components/TableHeader';
import TablePagination from '../../components/TablePagination';
import { SESSIONS } from '../../constants/SESSIONS';

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

    const filteredSessions = useMemo(() => {
        return SESSIONS.filter((session) =>
            [session.ip, session.device, session.last_seen].join(' ').toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    const totalRows = filteredSessions.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginatedSessions = filteredSessions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                        {paginatedSessions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    No sessions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedSessions.map((session, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="px-4 py-2">{session.ip}</TableCell>
                                    <TableCell className="px-4 py-2">{session.device}</TableCell>
                                    <TableCell className="px-4 py-2">{session.last_seen}</TableCell>
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
