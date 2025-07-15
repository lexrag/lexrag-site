'use client';

import { useEffect, useState, useMemo } from 'react';
import { getTariffs } from '@/api/tariffs/getTariffs';
import { mapTariffsToFeatures, mapTariffsToPlans } from '@/utils/mapPlans';
import { PlansTableProps, Tariff } from '@/types/PlansTable'; 
import { Label } from '@/components/ui/label';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import FeatureRow from './FeatureRow';
import PlansRow from './PlansRow';

function PlansTable({ currentSubscription, onChangePlan, onCancelPlan }: PlansTableProps) {
    const [annual, setAnnual] = useState<boolean>(false);
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const tariffs = await getTariffs();
            setTariffs(tariffs);
            setLoading(false);
        })();
    }, []);

    const filteredTariffs = useMemo(
        () => tariffs.filter((tariff) => tariff.duration === (annual ? 12 : 1)).sort((a, b) => a.price - b.price),
        [tariffs, annual]
    );

    const plans = useMemo(() => mapTariffsToPlans(filteredTariffs), [filteredTariffs]);
    const features = useMemo(() => mapTariffsToFeatures(filteredTariffs), [filteredTariffs]);

    if (loading) {
        return (
            <div className="py-12 text-center text-muted-foreground">Loading plans...</div>
        );
    }

    return (
        <Table className="w-full caption-bottom text-foreground text-sm table-fixed border-separate border-spacing-0 mt-3 min-w-4xl rounded-xl hover:bg-transparent">
            <TableBody>
                <TableRow className="border-b">
                    <TableCell className="p-4 border-b-0 align-bottom pt-7.5 pb-6">
                        <div className="flex items-center">
                            <SwitchWrapper className="space-x-2">
                                <Switch checked={annual} onCheckedChange={setAnnual} />
                                <Label className="font-medium text-sm">Annual Billing</Label>
                            </SwitchWrapper>
                        </div>
                    </TableCell>
                    {plans.map((plan, idx) => (
                        <PlansRow
                            key={plan.id}
                            plan={plan}
                            idx={idx}
                            currentPlanId={
                                currentSubscription?.status === 'active' ? currentSubscription.tariff_id : null
                            }
                            onChangePlan={onChangePlan}
                            onCancelPlan={onCancelPlan}
                            annual={annual}
                        />
                    ))}
                </TableRow>
                {features.map((feature) => (
                    <FeatureRow key={feature.id} feature={feature} />
                ))}
            </TableBody>
        </Table>
    );
}

export default PlansTable;
