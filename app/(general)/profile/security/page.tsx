import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';

const SecurityPage = async () => {
    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
                <Security />
                <LoginSessions />
            </div>
        </div>
    );
};

export default SecurityPage;
