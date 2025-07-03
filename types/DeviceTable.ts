import { Column } from './Column';
import { Device } from './Device';

export interface DeviceTableHeaderProps {
    columns: Column[];
    allSelected?: boolean;
    indeterminate?: boolean;
    onSelectAll?: (checked: boolean) => void;
    sortState?: { key: string; direction: 'asc' | 'desc' };
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    headerCheckboxRef?: React.RefObject<HTMLButtonElement>;
}

export interface DeviceTableHeaderCellProps {
    column: Column;
    allSelected?: boolean;
    indeterminate?: boolean;
    onSelectAll?: (checked: boolean) => void;
    sortState?: { key: string; direction: 'asc' | 'desc' };
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    headerCheckboxRef?: React.RefObject<HTMLButtonElement> | null | undefined;
}

export interface DeviceTableRowProps {
    device: Device;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export interface TablePaginationProps {
    page: number;
    totalPages: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    totalRows: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (value: string) => void;
}
