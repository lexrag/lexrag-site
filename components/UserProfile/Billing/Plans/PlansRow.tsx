import { PlansRowProps } from '@/types/PlansTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { PLANS } from '../../constants/PLANS';

function PlansRow({ plan, idx, annual }: PlansRowProps) {
    return (
        <TableCell
            key={plan.id}
            className={
                'p-4 align-middle border-b-0 border-t border ' +
                (idx === 0 ? 'bg-muted/40 ltr:rounded-tl-xl rtl:rounded-tr-xl relative border-t' : '') +
                (idx === PLANS.length - 1 ? ' ltr:rounded-tr-xl rtl:rounded-tl-xl border-e' : '') +
                ' pt-7.5'
            }
        >
            {plan.badge && (
                <Badge
                    variant="success"
                    appearance="outline"
                    size="md"
                    className="absolute top-0 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    {plan.badge}
                </Badge>
            )}
            <h3 className="text-lg font-medium pb-2">{plan.name}</h3>
            <div className="text-secondary-foreground text-sm">{plan.description}</div>
            <div className="py-4">
                <h4 className="text-2xl font-semibold leading-none">{annual ? plan.priceAnnual : plan.priceMonthly}</h4>
                {plan.name !== 'Basic' && <div className="text-secondary-foreground text-xs">per month</div>}
            </div>
            <Button
                variant={plan.button?.variant as 'primary' | 'outline' | 'ghost'}
                className="w-full justify-center"
                disabled={plan.button?.disabled}
            >
                {plan.button?.label}
            </Button>
        </TableCell>
    );
}

export default PlansRow;
