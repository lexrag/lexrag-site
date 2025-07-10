'use client';

import { useEffect, useState } from 'react';
import { getTariffs } from '@/api/tariffs/getTariffs';
import { mapTariffsToFeatures, mapTariffsToPlans } from '@/utils/mapPlans';
import { Feature, Plan, PlansTableProps, Tariff } from '@/types/PlansTable';
import { Label } from '@/components/ui/label';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import FeatureRow from './FeatureRow';
import PlansRow from './PlansRow';

function PlansTable({ currentPlanId, onChangePlan }: PlansTableProps) {
    const [annual, setAnnual] = useState<boolean>(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [tariffs, setTariffs] = useState<Tariff[]>([]);

    useEffect(() => {
        (async () => {
            const tariffs = await getTariffs();
            const filteredTariffs = tariffs
                .filter((tariff: Tariff) => tariff.duration === (annual ? 12 : 1))
                .sort((a: Tariff, b: Tariff) => a.price - b.price);
            setTariffs(filteredTariffs);
            setPlans(mapTariffsToPlans(filteredTariffs));
            setFeatures(mapTariffsToFeatures(filteredTariffs));
        })();
    }, []);

    useEffect(() => {
        setPlans(mapTariffsToPlans(tariffs.filter((tariff: Tariff) => tariff.duration === (annual ? 12 : 1))));
        setFeatures(mapTariffsToFeatures(tariffs.filter((tariff: Tariff) => tariff.duration === (annual ? 12 : 1))));
    }, [annual]);

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
                            currentPlanId={currentPlanId}
                            onChangePlan={onChangePlan}
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
