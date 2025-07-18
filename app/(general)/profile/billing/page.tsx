import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import PaymentsHistory from '@/components/UserProfile/Billing/PaymentsHistory';

const BillingPage = () => {
    return (
        <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
            <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                <BillingPlan />
                <PaymentsHistory />
            </div>
        </div>
    );
};

export default BillingPage;
