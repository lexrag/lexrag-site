import { getMeServer } from '@/api/auth/getMeServer';
import Legal from '@/components/UserProfile/Compliance/Legal';

const CompliancePage = async () => {
    const user = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
                <Legal user={user} />
            </div>
        </div>
    );
};
export default CompliancePage;
