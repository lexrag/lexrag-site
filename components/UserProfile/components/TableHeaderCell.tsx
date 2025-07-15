import { DeviceTableHeaderCellProps } from '@/types/DeviceTable';
import { Checkbox } from '@/components/ui/checkbox';
import { TableHead } from '@/components/ui/table';
import { getSortMenuItems } from '@/components/UserProfile/constants/MENU_ITEMS';
import RecursiveDropdown from './RecursiveDropdown';

const DeviceTableHeaderCell = ({
    column,
    allSelected,
    indeterminate,
    onSelectAll,
    sortState,
    onSort,
    headerCheckboxRef,
}: DeviceTableHeaderCellProps) => {
    return (
        <TableHead className={`${column.key === 'select' ? 'w-16' : column.className} border-r border-border p-0`}>
            <div className="flex items-center justify-center h-full min-h-[48px]">
                {column.key === 'select' ? (
                    <Checkbox
                        checked={allSelected}
                        onCheckedChange={onSelectAll}
                        ref={headerCheckboxRef}
                        data-indeterminate={indeterminate}
                    />
                ) : column.label ? (
                    <span className="flex items-center gap-1 pl-3 w-full text-left">
                        {column.label}
                        {column.sortable && onSort && (
                            <RecursiveDropdown
                                items={getSortMenuItems(column.key, sortState?.direction || 'asc', onSort)}
                            />
                        )}
                        {column.menuItems && <RecursiveDropdown items={column.menuItems} />}
                    </span>
                ) : null}
            </div>
        </TableHead>
    );
};

export default DeviceTableHeaderCell;
