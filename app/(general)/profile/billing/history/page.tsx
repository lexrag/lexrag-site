import PageTitle from '@/components/Layout/PageTitle';
import BillingsTable from '@/components/UserProfile/Billing/BillingHistory/BillingsTable';
import ContactSupport from '@/components/UserProfile/Security/Sessions/ContactSupport';
import Questions from '@/components/UserProfile/Security/Sessions/Questions';

const BillingHistoryPage = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-background w-full px-4 lg:px-6">
            <section className="flex flex-col w-full items-center justify-center">
                <PageTitle />
                <div className="flex flex-col w-full gap-8 items-center justify-center md:justify-start">
                    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8">
                        <BillingsTable />
                        <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5 w-full">
                            <Questions />
                            <ContactSupport />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BillingHistoryPage;
