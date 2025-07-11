'use client';

import { useEffect, useState } from 'react';
import { cancelSubscription } from '@/api/tariffs/cancelSubsription';
import { createSubscription } from '@/api/tariffs/createSubscription';
import { getCurrentSubscription } from '@/api/tariffs/getCurrentSubscription';
import { toast } from 'sonner';
import { CurrentSubscription } from '@/types/CurrentSubscription';
import CancelPlanDialog from './CancelPlanDialog';
import ChangePlanDialog from './ChangePlanDialog';
import PlansTable from './PlansTable';

const PlansTableContainer = () => {
    const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextTariffId, setNextTariffId] = useState<string | null>(null);
    const [dialogType, setDialogType] = useState<'change' | 'cancel' | null>(null);

    useEffect(() => {
        (async () => {
            const sub = await getCurrentSubscription();
            setCurrentSubscription(sub);
        })();
    }, []);

    const handleChangePlan = async (newTariffId: string) => {
        if (!currentSubscription) return;
        if (currentSubscription.status === 'pending') {
            setLoading(true);
            await cancelSubscription(currentSubscription.id);
            const res = await createSubscription(newTariffId);
            setLoading(false);
            if (res.checkout_url) window.location.href = res.checkout_url;
            else toast.error('Failed to create subscription');
            return;
        }
        if (currentSubscription.status === 'active') {
            setNextTariffId(newTariffId);
            setDialogType('change');
            setDialogOpen(true);
        }
        if (currentSubscription.status === 'canceled' || currentSubscription.detail) {
            setLoading(true);
            const res = await createSubscription(newTariffId);
            setLoading(false);
            if (res.checkout_url) window.location.href = res.checkout_url;
            else toast.error('Failed to create subscription');
            return;
        }
    };

    const handleConfirmChangePlan = async () => {
        if (!currentSubscription || !nextTariffId) return;
        setLoading(true);
        await cancelSubscription(currentSubscription.id);
        const res = await createSubscription(nextTariffId);
        setLoading(false);
        setDialogOpen(false);
        setNextTariffId(null);
        setDialogType(null);
        if (res.checkout_url) window.location.href = res.checkout_url;
        else toast.error('Failed to create subscription');
    };

    const handleCancelOnlyPlan = () => {
        setDialogType('cancel');
        setDialogOpen(true);
    };

    const handleConfirmCancelOnlyPlan = async () => {
        if (!currentSubscription) return;
        setLoading(true);
        await cancelSubscription(currentSubscription.id);
        setCurrentSubscription(null);
        setLoading(false);
        setDialogOpen(false);
        setDialogType(null);
        toast.success('Subscription cancelled');
    };

    return (
        <>
            <PlansTable
                currentSubscription={currentSubscription}
                onChangePlan={handleChangePlan}
                onCancelPlan={handleCancelOnlyPlan}
            />
            {dialogType === 'change' && (
                <ChangePlanDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onConfirm={handleConfirmChangePlan}
                    loading={loading}
                />
            )}
            {dialogType === 'cancel' && (
                <CancelPlanDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onCancel={handleConfirmCancelOnlyPlan}
                    loading={loading}
                />
            )}
        </>
    );
};

export default PlansTableContainer;
