import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import Legal from '@/components/UserProfile/Compliance/Legal';

const CompliancePage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <Legal currentUser={currentUser} />
            </div>
        </div>
    );
};
export default CompliancePage;
