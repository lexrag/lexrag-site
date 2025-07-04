import Image from 'next/image';
import { toUppercaseFirstLetter } from '@/utils/toUpperCaseFirstLetter';
import { LogOut } from 'lucide-react';
import { Device } from '@/types/Device';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface TrustedDeviceRowProps {
    device: Device;
}

export const TrustedDeviceRow = ({ device }: TrustedDeviceRowProps) => {
    return (
        <TableRow>
            <TableCell className="p-4 align-middle min-w-48 w-48">
                <div className="flex items-center gap-2.5">
                    <Image src={device.browserIcon} alt={device.browser} width={24} height={24} />
                    <div className="flex flex-col">
                        <div className="text-sm font-medium text-mono hover:text-primary-active mb-px">
                            {toUppercaseFirstLetter(device.browser)}
                        </div>
                        <div className="flex gap-1.5">
                            <span className="text-xs text-secondary-foreground">{device.location}</span>
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pe-0 min-w-56 text-secondary-foreground font-normal">
                {device.os}
                <br />
                Active: {device.lastSession}
            </TableCell>
            <TableCell
                data-slot="table-cell"
                className="p-4 align-middle [&:has([role=checkbox])]:pe-0 pr-7.5! min-w-16 text-end"
            >
                <Button variant="ghost">
                    <LogOut className="w-4 h-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
};
