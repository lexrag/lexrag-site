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
import { Loader2 } from 'lucide-react';
import CancelPlanDialog from './Plans/CancelPlanDialog';
import { useAnalytics } from '@/hooks/use-analytics';

const BillingPlan = () => {
    const { trackSubscription } = useAnalytics();
    const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingSubscription(true);
                setError(null);
                const sub = await getCurrentSubscription();
                
                // Проверяем, есть ли ошибка в ответе (detail обычно содержит сообщение об ошибке)
                if (sub.detail && typeof sub.detail === 'string' && sub.detail.includes('error')) {
                    setCurrentSubscription(null);
                } else if (sub.status === 'pending') {
                    setCurrentSubscription(null);
                } else {
                    // Если есть данные подписки, устанавливаем их
                    setCurrentSubscription(sub);
                }
            } catch (err) {
                console.error('Error fetching subscription:', err);
                setError(err instanceof Error ? err.message : 'Failed to load subscription');
                setCurrentSubscription(null);
            } finally {
                setIsLoadingSubscription(false);
            }
        })();
    }, []);

    const handleConfirmCancelPlan = async () => {
        setLoading(true);
        try {
            await cancelSubscription();
            
            if (currentSubscription?.tariff) {
                trackSubscription(
                    'cancelled',
                    currentSubscription.tariff_id,
                    currentSubscription.tariff.name,
                    currentSubscription.tariff.price || 0
                );
            }
            
            setDialogOpen(false);
            setCurrentSubscription(null);
        } catch (err) {
            console.error('Error canceling subscription:', err);
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingSubscription) {
        return (
            <Card className="w-full">
                <CardContent className="w-full">
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Loading subscription...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="w-full">
                    <div className="flex items-center justify-center py-8 text-red-500">
                        <span>Error: {error}</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <IntlProvider locale="en-US">
            <Card className="w-full">
                <CardContent className="w-full">
                    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                        <div className="flex flex-wrap items-center gap-5 justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2.5">
                                    <h2 className="text-2xl font-semibold text-mono">
                                        {currentSubscription?.tariff?.name || 'No Plan'} Plan
                                    </h2>
                                    {currentSubscription?.tariff && (
                                        <Badge variant="success" appearance="outline" size="md">
                                            {currentSubscription?.tariff?.duration === 12 ? 'Yearly' : 'Monthly'}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-secondary-foreground">
                                    {currentSubscription?.tariff?.description || 'No active subscription'}
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
