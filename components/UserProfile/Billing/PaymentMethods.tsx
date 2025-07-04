import { LucideSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import PaymentMethod from './components/PaymentMethod';

const paymentMethods = [
    {
        cardholder: 'John Doe',
        brandImage: '/media/icons/visa.svg',
        last4: '1234',
        expiry: '01/2025',
    },
    {
        cardholder: 'Jane Smith',
        brandImage: '/media/icons/visa.svg',
        last4: '5678',
        expiry: '03/2026',
    },
    {
        cardholder: 'Michael Johnson',
        brandImage: '/media/icons/master_card.svg',
        last4: '9012',
        expiry: '08/2025',
    },
];

const PaymentMethods = () => {
    return (
        <CardWrapper
            title="Payment Methods"
            headerActions={
                <Button variant="secondary">
                    <LucideSquarePlus /> Add new
                </Button>
            }
        >
            <div className="flex flex-col gap-4 p-4">
                {paymentMethods.map((method, index) => (
                    <PaymentMethod
                        key={method.last4}
                        cardholder={method.cardholder}
                        brandImage={method.brandImage}
                        last4={method.last4}
                        expiry={method.expiry}
                        isPrimary={index === 0}
                    />
                ))}
            </div>
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Button variant="link">View all payment methods</Button>
            </CardFooter>
        </CardWrapper>
    );
};

export default PaymentMethods;
