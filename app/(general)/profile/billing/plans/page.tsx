'use client';

import PageTitle from '@/components/Layout/PageTitle';
import PlansTable from '@/components/UserProfile/Billing/Plans/PlansTable';

const PlansPage = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-background w-full px-4 lg:px-6">
            <section className="flex flex-col w-full items-center justify-center">
                <PageTitle />
                <div className="flex flex-col w-full gap-8 items-center justify-center md:justify-start">
                    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8">
                        <PlansTable />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PlansPage;
