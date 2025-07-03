import { DeviceTableHeaderProps } from '@/types/DeviceTable';
import { TableHeader, TableRow } from '@/components/ui/table';
import DeviceTableHeaderCell from './DeviceTableHeaderCell';

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
        <TableRow className={indeterminate ? 'bg-muted' : ''} data-slot="table-row">
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
