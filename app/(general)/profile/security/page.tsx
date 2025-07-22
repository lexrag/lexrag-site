import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';

const SecurityPage = async () => {
    return (
        <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <Security />
                <LoginSessions />
            </div>
        </div>
    );
};

export default SecurityPage;
