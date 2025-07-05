import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BillingPlan = () => {
    return (
        <Card className="w-full">
            <CardContent className="w-full">
                <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                    <div className="flex flex-wrap items-center gap-5 justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2.5">
                                <h2 className="text-2xl font-semibold text-mono">Basic Plan</h2>
                                <Badge variant="success" appearance="outline" size="md">
                                    Monthly
                                </Badge>
                            </div>
                            <p className="text-sm text-secondary-foreground">
                                Essential Features for Startups and Individuals
                            </p>
                        </div>
                        <div className="flex gap-2.5">
                            <Button variant="secondary">Cancel Plan</Button>
                            <Button>Upgrade Plan</Button>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-2 lg:gap-5 w-full">
                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input rounded-md px-3.5 py-2 min-w-24 max-w-auto">
                            <span className="text-mono text-base leading-none font-medium">$769.00</span>
                            <span className="text-secondary-foreground text-sm">Annual Total</span>
                        </div>
                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input rounded-md px-3.5 py-2 min-w-24 max-w-auto">
                            <span className="text-mono text-base leading-none font-medium">$69.00</span>
                            <span className="text-secondary-foreground text-sm">Next Bill Amount</span>
                        </div>
                        <div className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input rounded-md px-3.5 py-2 min-w-24 max-w-auto">
                            <span className="text-mono text-base leading-none font-medium">23 Aug, 24</span>
                            <span className="text-secondary-foreground text-sm">Next Billing Date</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BillingPlan;
