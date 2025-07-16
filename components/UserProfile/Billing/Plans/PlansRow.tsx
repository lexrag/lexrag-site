import { FormattedNumber, IntlProvider } from 'react-intl';
import { PlansRowProps } from '@/types/PlansTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';

function PlansRow({ plan, idx, currentPlanId, onChangePlan, onCancelPlan, annual }: PlansRowProps) {
    const isCurrent = plan.id.toString() === currentPlanId?.toString();

    return (
        <IntlProvider locale="en-US">
            <TableCell
                key={plan.id}
                className={
                    'relative p-4 pt-7 align-middle border-b-0 border-t border ' +
                    (idx === 0 ? 'bg-muted/40 ltr:rounded-tl-xl rtl:rounded-tr-xl border-t' : '')
                }
            >
                {isCurrent && (
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
                        <Badge variant="success" appearance="outline" size="md">
                            Current Plan
                        </Badge>
                    </div>
                )}
                <h3 className="text-lg font-medium pb-2">{plan.name}</h3>
                <div className="text-secondary-foreground text-sm">{plan.description}</div>
                <div className="py-4">
                    <h4 className="text-2xl font-semibold leading-none">
                        <FormattedNumber value={plan.price} style="currency" currency="USD" />
                    </h4>
                    <div className="text-secondary-foreground text-xs">{annual ? 'per year' : 'per month'}</div>
                </div>
                <Button
                    variant={isCurrent ? 'outline' : 'primary'}
                    className="w-full justify-center"
                    onClick={() => (isCurrent ? onCancelPlan?.() : onChangePlan(plan.id.toString()))}
                >
                    {isCurrent ? 'Cancel Plan' : 'Change Plan'}
                </Button>
            </TableCell>
        </IntlProvider>
    );
}

export default PlansRow;
