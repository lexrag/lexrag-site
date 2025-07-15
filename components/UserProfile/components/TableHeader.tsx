import { DeviceTableHeaderProps } from '@/types/DeviceTable';
import { TableHeader, TableRow } from '@/components/ui/table';
import DeviceTableHeaderCell from './TableHeaderCell';

const DeviceTableHeader = ({
    columns,
    allSelected,
    indeterminate,
    onSelectAll,
    sortState,
    onSort,
    headerCheckboxRef,
}: DeviceTableHeaderProps) => (
    <TableHeader>
        <TableRow className={indeterminate ? 'bg-muted' : ''}>
            {columns.map((col) => (
                <DeviceTableHeaderCell
                    key={col.key}
                    column={col}
                    allSelected={allSelected}
                    indeterminate={indeterminate}
                    onSelectAll={onSelectAll}
                    sortState={sortState}
                    onSort={onSort}
                    headerCheckboxRef={headerCheckboxRef}
                />
            ))}
        </TableRow>
    </TableHeader>
);

export default DeviceTableHeader;
