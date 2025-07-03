import PageTitle from '@/components/Layout/PageTitle';
import Authentication from '@/components/UserSecurity/Overview/Authentication';
import LoginSessions from '@/components/UserSecurity/Overview/LoginSessions';
import TrustedDevices from '@/components/UserSecurity/Overview/TrustedDevices';

const SecurityPage = () => {
    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                    <Authentication />
                    <LoginSessions />
                    <TrustedDevices />
                </div>
            </div>
        </section>
    );
};

export default SecurityPage;
