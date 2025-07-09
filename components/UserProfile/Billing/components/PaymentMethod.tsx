import Image from 'next/image';
import { SquarePen, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PaymentMethodProps {
    cardholder: string;
    brandImage: string;
    last4: string;
    expiry: string;
    isPrimary?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const PaymentMethod = ({
    cardholder,
    brandImage,
    last4,
    expiry,
    isPrimary = false,
    onEdit,
    onDelete,
}: PaymentMethodProps) => {
    return (
        <div className="flex items-center justify-between border border-border rounded-xl gap-2 px-4 py-4 bg-secondary-clarity w-full">
            <div className="flex items-center gap-3.5">
                <Image width={40} height={24} alt={cardholder + ' card'} src={brandImage} className="w-10 shrink-0" />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-mono hover:text-primary-active mb-px">{cardholder}</span>
                    <span className="text-sm text-secondary-foreground">
                        Ending {last4} Expires on {expiry}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-5">
                {isPrimary && (
                    <Badge variant="success" appearance="outline" size="md">
                        Primary
                    </Badge>
                )}
                <div className="flex gap-0.5">
                    <Button variant="ghost" size="icon" onClick={onEdit}>
                        <SquarePen className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onDelete}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
