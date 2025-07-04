import PageTitle from '@/components/Layout/PageTitle';
import Legal from '@/components/UserProfile/Compliance/Legal';

const CompliancePage = () => {
    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                    <Legal />
                </div>
            </div>
        </section>
    );
};

export default CompliancePage;
