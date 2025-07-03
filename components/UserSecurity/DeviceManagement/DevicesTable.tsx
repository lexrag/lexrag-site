'use client';

import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { SortState } from '@/types/SortState';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTable, CardToolbar } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { COLUMNS } from '../constants/COLUMNS';
import { DEVICES } from '../constants/DEVICES';
import DeviceTableHeader from './components/DeviceTableHeader';
import DeviceTableRow from './components/DeviceTableRow';
import TablePagination from './components/TablePagination';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const DevicesTable = () => {
    const [search, setSearch] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [selected, setSelected] = useState<number[]>([]);
    const [sortState, setSortState] = useState<SortState>({
        key: 'deviceName',
        direction: 'asc',
    });
    const headerCheckboxRef = useRef<HTMLButtonElement>(null);

    const filteredDevices = useMemo(() => {
        return DEVICES.filter((device) =>
            [device.deviceName, device.browser, device.os, device.ip, device.location]
                .join(' ')
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [search]);

    const sortedDevices = useMemo(() => {
        const sorted = [...filteredDevices];
        sorted.sort((a, b) => {
            const { key, direction } = sortState;
            let aValue = a[key as keyof typeof a];
            let bValue = b[key as keyof typeof b];
            if (aValue === undefined) aValue = '';
            if (bValue === undefined) bValue = '';
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return 0;
        });
        return sorted;
    }, [filteredDevices, sortState]);

    const totalRows = sortedDevices.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginatedDevices = sortedDevices.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const allSelected =
        paginatedDevices.length > 0 &&
        paginatedDevices.every((_, idx) => selected.includes((page - 1) * rowsPerPage + idx));
    const indeterminate =
        selected.length > 0 &&
        !allSelected &&
        paginatedDevices.some((_, idx) => selected.includes((page - 1) * rowsPerPage + idx));

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.dataset.indeterminate = indeterminate.toString();
        }
    }, [indeterminate]);
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(
                Array.from(new Set([...selected, ...paginatedDevices.map((_, idx) => (page - 1) * rowsPerPage + idx)])),
            );
        } else {
            setSelected(
                selected.filter((i) => !paginatedDevices.map((_, idx) => (page - 1) * rowsPerPage + idx).includes(i)),
            );
        }
    };

    const handleSelectRow = (globalIdx: number, checked: boolean) => {
        setSelected((prev) => (checked ? [...prev, globalIdx] : prev.filter((i) => i !== globalIdx)));
    };

    const handlePageChange = (newPage: number) => setPage(newPage);

    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(Number(value));
        setPage(1);
    };

    const handleSort = (key: string) => {
        setSortState((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <Card>
            <CardHeader className="p-4">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            className="ps-9 w-40"
                            placeholder="Search Devices..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            variant="md"
                        />
                    </div>
                </div>
                <CardToolbar>
                    <Button variant="primary" size="md">
                        Add Device
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="md">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {COLUMNS.filter((col) => col.key !== 'select' && col.label).map((col) => (
                                <DropdownMenuItem key={col.key}>{col.label}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardToolbar>
            </CardHeader>
            <CardTable>
                <Table className="min-w-[700px] rounded-lg border border-border bg-card shadow-xs">
                    <DeviceTableHeader
                        columns={COLUMNS}
                        allSelected={allSelected}
                        indeterminate={indeterminate}
                        onSelectAll={handleSelectAll}
                        sortState={sortState}
                        onSort={handleSort}
                        headerCheckboxRef={headerCheckboxRef as RefObject<HTMLButtonElement>}
                    />
                    <TableBody>
                        {paginatedDevices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-muted-foreground">
                                    No devices found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedDevices.map((device, idx) => {
                                const globalIdx = (page - 1) * rowsPerPage + idx;
                                return (
                                    <DeviceTableRow
                                        key={globalIdx}
                                        device={device}
                                        checked={selected.includes(globalIdx)}
                                        onCheckedChange={(checked) => handleSelectRow(globalIdx, checked as boolean)}
                                    />
                                );
                            })
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

export default DevicesTable;
