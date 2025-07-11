import { Check, X } from 'lucide-react';
import { FeatureRowProps } from '@/types/PlansTable';
import { TableCell, TableRow } from '@/components/ui/table';

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
                        (idx === feature.values.length - 1 ? ' border-e' : '')
                    }
                >
                    {typeof value === 'boolean' ? (
                        value ? (
                            <Check className="text-green-500 text-lg" />
                        ) : (
                            <X className="text-red-500 text-lg" />
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
