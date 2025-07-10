import { PlansRowProps } from '@/types/PlansTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';

function PlansRow({ plan, idx, currentPlanId, onChangePlan }: PlansRowProps) {
    const isCurrent = plan.id === currentPlanId;

    let buttonLabel = 'Change Plan';
    if (isCurrent) buttonLabel = 'Current Plan';

    return (
        <TableCell
            key={plan.id}
            className={
                'relative p-4 align-middle border-b-0 border-t border ' +
                (idx === 0 ? 'bg-muted/40 ltr:rounded-tl-xl rtl:rounded-tr-xl border-t' : '')
            }
        >
            {isCurrent && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="success" appearance="outline" size="md">
                        Current Plan
                    </Badge>
                </div>
            )}
            <h3 className="text-lg font-medium pb-2">{plan.name}</h3>
            <div className="text-secondary-foreground text-sm">{plan.description}</div>
            <div className="py-4">
                <h4 className="text-2xl font-semibold leading-none">{plan.price}</h4>
                <div className="text-secondary-foreground text-xs">per month</div>
            </div>
            <Button
                variant={isCurrent ? 'outline' : 'primary'}
                className="w-full justify-center"
                onClick={() => onChangePlan(plan.id)}
            >
                {buttonLabel}
            </Button>
        </TableCell>
    );
}

export default PlansRow;
