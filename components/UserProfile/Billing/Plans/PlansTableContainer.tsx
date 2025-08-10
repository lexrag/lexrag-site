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
            try {
                const sub = await getCurrentSubscription();
                setCurrentSubscription(sub);
            } catch (error) {
                console.error('Error fetching current subscription:', error);
                setCurrentSubscription(null);
            }
        })();
    }, []);

    const handleChangePlan = async (newTariffId: string) => {
        if (!currentSubscription) return;

        try {
            if (currentSubscription.status === 'pending') {
                setLoading(true);
                await cancelSubscription();
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
        } catch (error) {
            console.error('Error changing plan:', error);
            toast.error('Failed to change plan');
            setLoading(false);
        }
    };

    const handleConfirmChangePlan = async () => {
        if (!currentSubscription || !nextTariffId) return;

        try {
            setLoading(true);
            await cancelSubscription();
            const res = await createSubscription(nextTariffId);
            setLoading(false);
            setDialogOpen(false);
            setNextTariffId(null);
            setDialogType(null);
            if (res.checkout_url) window.location.href = res.checkout_url;
            else toast.error('Failed to create subscription');
        } catch (error) {
            console.error('Error confirming plan change:', error);
            toast.error('Failed to change plan');
            setLoading(false);
        }
    };

    const handleCancelOnlyPlan = () => {
        setDialogType('cancel');
        setDialogOpen(true);
    };

    const handleConfirmCancelOnlyPlan = async () => {
        if (!currentSubscription) return;

        try {
            setLoading(true);
            await cancelSubscription();
            setCurrentSubscription(null);
            setLoading(false);
            setDialogOpen(false);
            setDialogType(null);
            toast.success('Subscription cancelled');
        } catch (error) {
            console.error('Error canceling plan:', error);
            toast.error('Failed to cancel subscription');
            setLoading(false);
        }
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
