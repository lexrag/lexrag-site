import Legal from '@/components/UserProfile/Compliance/Legal';

const CompliancePage = async () => {
    return (
        <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <Legal />
            </div>
        </div>
    );
};
export default CompliancePage;
