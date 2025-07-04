import { toUppercaseFirstLetter } from '@/utils/toUpperCaseFirstLetter';
import { Monitor, SquarePen, Trash2 } from 'lucide-react';
import { DeviceTableRowProps } from '@/types/DeviceTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { DEVICE_ICONS } from '@/components/UserProfile/constants/DEVICES';

const DeviceTableRow = ({ device, checked, onCheckedChange }: DeviceTableRowProps) => {
    const Icon = DEVICE_ICONS[device.deviceType as keyof typeof DEVICE_ICONS] || Monitor;
    return (
        <TableRow className={checked ? 'bg-muted' : ''} data-slot="table-row">
            <TableCell className="w-12 border-r border-border p-0">
                <div className="flex items-center justify-center h-full min-h-[48px]">
                    <Checkbox
                        checked={checked}
                        onCheckedChange={onCheckedChange}
                        aria-label="Select row"
                        className="size-4.5 "
                    />
                </div>
            </TableCell>
            <TableCell className="w-60 px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                <div className="flex items-center gap-4">
                    <Icon className="text-xl text-muted-foreground" />
                    <div className="flex flex-col gap-0.5 justify-center">
                        <span className="leading-none font-medium text-sm text-mono align-middle">
                            {device.deviceName}
                        </span>
                        <span className="text-sm text-secondary-foreground font-normal align-middle">
                            {toUppercaseFirstLetter(device.browser)} {device.os}
                        </span>
                    </div>
                </div>
            </TableCell>
            <TableCell className="w-40 px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                <span className="text-sm text-foreground font-normal">{device.ip}</span>
            </TableCell>
            <TableCell className="w-40 px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                <span className="text-sm text-foreground font-normal">{device.location}</span>
            </TableCell>
            <TableCell className="w-40 px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                <span className="text-sm text-foreground font-normal">{device.added}</span>
            </TableCell>
            <TableCell className="w-40 px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                <span className="text-sm text-foreground font-normal">{device.lastSession}</span>
            </TableCell>
            <TableCell className="w-16">
                <Button variant="ghost" size="icon">
                    <SquarePen />
                </Button>
            </TableCell>
            <TableCell className="w-16">
                <Button variant="ghost" size="icon">
                    <Trash2 />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default DeviceTableRow;
