import { getMeServer } from '@/api/auth/getMeServer';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';

const SecurityPage = async () => {
    const user = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
                <Security user={user} />
                <LoginSessions />
            </div>
        </div>
    );
};

export default SecurityPage;
