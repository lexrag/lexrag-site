import Legal from '@/components/UserProfile/Compliance/Legal';

const CompliancePage = async () => {
    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
                <Legal />
            </div>
        </div>
    );
};
export default CompliancePage;
