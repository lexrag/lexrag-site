'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cancelSubscription } from '@/api/tariffs/cancelSubsription';
import { getCurrentSubscription } from '@/api/tariffs/getCurrentSubscription';
import { getNextBillingDate } from '@/utils/getNextBillingDate';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { CurrentSubscription } from '@/types/CurrentSubscription';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CancelPlanDialog from './Plans/CancelPlanDialog';

const BillingPlan = () => {
    const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            const sub = await getCurrentSubscription();
            if (sub.detail || sub.status === 'pending') {
                setCurrentSubscription(null);
            } else {
                setCurrentSubscription(sub);
            }
        })();
    }, []);

    const handleConfirmCancelPlan = async () => {
        setLoading(true);
        await cancelSubscription(currentSubscription?.id ?? '');
        setLoading(false);
        setDialogOpen(false);
        setCurrentSubscription(null);
    };

    return (
        <IntlProvider locale="en-US">
            <Card className="w-full">
                <CardContent className="w-full">
                    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                        <div className="flex flex-wrap items-center gap-5 justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2.5">
                                    <h2 className="text-2xl font-semibold text-mono">
                                        {currentSubscription?.tariff?.name} Plan
                                    </h2>
                                    <Badge variant="success" appearance="outline" size="md">
                                        {currentSubscription?.tariff?.duration === 12 ? 'Yearly' : 'Monthly'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-secondary-foreground">
                                    {currentSubscription?.tariff?.description}
                                </p>
                            </div>
                            <div className="flex gap-2.5">
                                {currentSubscription?.status !== 'canceled' ||
                                    (!currentSubscription?.detail && (
                                        <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                                            Cancel Plan
                                        </Button>
                                    ))}
                                <Link href="/profile/billing/plans">
                                    <Button>Upgrade Plan</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 lg:gap-5 w-full">
                            <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input rounded-md px-3.5 py-2 min-w-24 max-w-auto">
                                <span className="text-mono text-base leading-none font-medium">
                                    <FormattedNumber
                                        value={currentSubscription?.tariff?.price ?? 0}
                                        style="currency"
                                        currency="USD"
                                    />
                                </span>
                                <span className="text-secondary-foreground text-sm">Next Bill Amount</span>
                            </div>
                            {currentSubscription && (
                                <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input rounded-md px-3.5 py-2 min-w-24 max-w-auto">
                                    <span className="text-mono text-base leading-none font-medium">
                                        {getNextBillingDate(
                                            currentSubscription?.created_at ?? '',
                                            currentSubscription?.tariff?.duration ?? 1,
                                        )}
                                    </span>
                                    <span className="text-secondary-foreground text-sm">Next Billing Date</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CancelPlanDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onCancel={handleConfirmCancelPlan}
                    loading={loading}
                />
            </Card>
        </IntlProvider>
    );
};

export default BillingPlan;
