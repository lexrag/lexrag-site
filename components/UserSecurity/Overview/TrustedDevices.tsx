'use client';

import Link from 'next/link';
import CardWrapper from '@/components/ui/card-wrapper';
import { Table } from '@/components/ui/table';
import RecursiveDropdown from '../components/RecursiveDropdown';
import { DEVICES } from '../constants/DEVICES';
import { MENU_ITEMS_TRUSTED_DEVICES } from '../constants/MENU_ITEMS';
import { TrustedDeviceRow } from './components/TrustedDeviceRow';

const TrustedDevices = () => (
    <CardWrapper title="Trusted Devices" headerActions={<RecursiveDropdown items={MENU_ITEMS_TRUSTED_DEVICES} />}>
        <div className="grow kt-scrollable-x-auto p-0">
            <div className="kt-scrollable-auto">
                <div data-slot="table-wrapper" className="relative w-full overflow-auto">
                    <Table className="w-full caption-bottom align-middle text-secondary-foreground font-medium text-sm">
                        <tbody className="[&_tr:last-child]:border-0">
                            {DEVICES.slice(0, 3).map((device, idx) => (
                                <TrustedDeviceRow key={idx} device={device} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        <div data-slot="card-footer" className="flex items-center px-5 min-h-14 border-t border-border justify-center">
            <Link
                data-slot="button"
                className="cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent font-medium text-primary hover:text-primary/90 [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1"
                href="/profile/security/device-management"
            >
                Manage Trusted Devices
            </Link>
        </div>
    </CardWrapper>
);

export default TrustedDevices;
