'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import { Table, TableBody } from '@/components/ui/table';
import RecursiveDropdown from '@/components/UserProfile/components/RecursiveDropdown';
import { DEVICES } from '@/components/UserProfile/constants/DEVICES';
import { MENU_ITEMS_TRUSTED_DEVICES } from '@/components/UserProfile/constants/MENU_ITEMS';
import { TrustedDeviceRow } from './components/SessionRow';

const TrustedDevices = () => (
    <CardWrapper title="Trusted Devices" headerActions={<RecursiveDropdown items={MENU_ITEMS_TRUSTED_DEVICES} />}>
        <div className="grow p-0">
            <div>
                <div className="relative w-full overflow-auto">
                    <Table className="w-full align-middle text-secondary-foreground font-medium text-sm">
                        <TableBody>
                            {DEVICES.slice(0, 3).map((device, idx) => (
                                <TrustedDeviceRow key={idx} device={device} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
            <Button variant="link">
                <Link href="/profile/security/device-management">Manage Trusted Devices</Link>
            </Button>
        </CardFooter>
    </CardWrapper>
);

export default TrustedDevices;
