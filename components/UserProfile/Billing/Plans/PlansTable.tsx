'use client';

import { useState } from 'react';
import { mapPlans } from '@/utils/mapPlans';
import { Label } from '@/components/ui/label';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { FEATURES, PLANS } from '@/components/UserProfile/constants/PLANS';
import FeatureRow from './FeatureRow';
import PlansRow from './PlansRow';

function PlansTable() {
    const [annual, setAnnual] = useState(true);
    const plans = mapPlans(PLANS);

    return (
        <Table className="w-full caption-bottom text-foreground text-sm table-fixed border-separate border-spacing-0 mt-3 min-w-4xl rounded-xl">
            <TableBody>
                <TableRow className="border-b transition-colors">
                    <TableCell className="p-4 border-b-0 align-bottom pt-7.5 pb-6 ">
                        <div className="flex items-center space-x-2">
                            <SwitchWrapper>
                                <Switch checked={annual} onCheckedChange={setAnnual} />
                                <Label className="font-medium text-sm">Annual Billing</Label>
                            </SwitchWrapper>
                        </div>
                    </TableCell>
                    {plans.map((plan, idx) => (
                        <PlansRow key={plan.id} plan={plan} idx={idx} annual={annual} />
                    ))}
                </TableRow>
                {FEATURES.map((feature) => (
                    <FeatureRow key={feature.id} feature={feature} />
                ))}
            </TableBody>
        </Table>
    );
}

export default PlansTable;
