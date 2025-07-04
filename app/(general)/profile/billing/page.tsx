import PageTitle from '@/components/Layout/PageTitle';
import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import InvoicesHistory from '@/components/UserProfile/Billing/InvoicesHistory';
import PaymentMethods from '@/components/UserProfile/Billing/PaymentMethods';

const BillingPage = () => {
    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                    <BillingPlan />
                    <PaymentMethods />
                    <InvoicesHistory />
                </div>
            </div>
        </section>
    );
};

export default BillingPage;
