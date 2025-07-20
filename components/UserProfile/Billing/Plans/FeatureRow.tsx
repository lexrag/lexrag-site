import { Check, X } from 'lucide-react';
import { FeatureRowProps } from '@/types/PlansTable';
import { TableCell, TableRow } from '@/components/ui/table';

function FeatureRow({ feature }: FeatureRowProps) {
    return (
        <TableRow key={feature.id}>
            <TableCell className="p-4 align-middle border-s border-b px-5 py-3.5 border">
                <div className="text-mono text-sm leading-none font-medium">{feature.label}</div>
            </TableCell>
            {feature.values.map((enabled, idx) => (
                <TableCell
                    key={idx}
                    className={
                        'p-4 align-middle border-b border-s px-5 py-3.5 border' +
                        (idx === 0 ? ' bg-muted/40' : '') +
                        (idx === feature.values.length - 1 ? ' border-e' : '')
                    }
                >
                    {enabled ? (
                        <Check className="text-green-500 text-lg mx-auto" />
                    ) : (
                        <X className="text-red-500 text-lg mx-auto" />
                    )}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default FeatureRow;
