'use client';

import { capitalize } from '@/utils/capitalize';
import { ChevronsUpDown } from 'lucide-react';
import { BillingsTableHeaderProps } from '@/types/Billing';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableHead, TableRow } from '@/components/ui/table';

const BillingsTableHeader = ({
    columns,
    statusOptions,
    paymentMethodOptions,
    status,
    paymentMethod,
    onStatusChange,
    onPaymentMethodChange,
}: BillingsTableHeaderProps) => (
    <TableRow>
        {columns.map((col) => {
            if (col.key === 'status' || col.key === 'payment') {
                const isStatus = col.key === 'status';
                const value = isStatus ? status : paymentMethod;
                const label = isStatus ? 'Status' : 'Payment Method';
                const options = isStatus ? statusOptions : paymentMethodOptions;
                const onChange = isStatus ? onStatusChange : onPaymentMethodChange;

                return (
                    <TableHead key={col.key} className={col.className + ' border px-1'}>
                        <div className="relative flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        {value ? capitalize(value) : capitalize(label)}
                                        <ChevronsUpDown className="size-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-40">
                                    <DropdownMenuItem onClick={() => onChange('')}>All</DropdownMenuItem>
                                    {options.map((opt) => (
                                        <DropdownMenuItem key={opt} onClick={() => onChange(opt)}>
                                            {capitalize(opt)}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TableHead>
                );
            }
            return (
                <TableHead key={col.key} className={col.className + ' border px-1'}>
                    <Button variant="ghost">{col.label}</Button>
                </TableHead>
            );
        })}
    </TableRow>
);

export default BillingsTableHeader;
