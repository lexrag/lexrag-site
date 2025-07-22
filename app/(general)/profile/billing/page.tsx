import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import PaymentsHistory from '@/components/UserProfile/Billing/PaymentsHistory';

const BillingPage = () => {
    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
                <BillingPlan />
                <PaymentsHistory />
            </div>
        </div>
    );
};

export default BillingPage;
