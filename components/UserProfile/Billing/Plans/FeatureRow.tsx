import { Check } from 'lucide-react';
import { FeatureRowProps } from '@/types/PlansTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { PLANS } from '../../constants/PLANS';

function FeatureRow({ feature }: FeatureRowProps) {
    return (
        <TableRow key={feature.id}>
            <TableCell className="p-4 align-middle border-s border-b px-5 py-3.5 border">
                <div className="text-mono text-sm leading-none font-medium">{feature.label}</div>
            </TableCell>
            {feature.values.map((value: string | React.ReactNode, idx: number) => (
                <TableCell
                    key={idx}
                    className={
                        'p-4 align-middle border-b border-s px-5 py-3.5 border' +
                        (idx === 0 ? ' bg-muted/40' : '') +
                        (idx === PLANS.length - 1 ? ' border-e' : '')
                    }
                >
                    {typeof value === 'string' ? (
                        value === 'Yes' ? (
                            <Check className="text-green-500 text-lg" />
                        ) : value === 'No' ? null : (
                            <div className="text-foreground text-sm">{value}</div>
                        )
                    ) : (
                        value
                    )}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default FeatureRow;
