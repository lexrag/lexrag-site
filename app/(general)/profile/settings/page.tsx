import { getUserInfoServer } from '@/api/auth/getUserInfoServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import Legal from '@/components/UserProfile/Compliance/Legal';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';
import Notifications from '@/components/UserProfile/Settings/Nofications';

const SettingsPage = async () => {
    const currentUser: User = await getUserInfoServer();
    console.log(currentUser);

    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            {currentUser && (
                <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                    <PersonalInfoCard currentUser={currentUser} />
                    <Other />
                    <BillingPlan />
                    <Notifications />
                    <Security currentUser={currentUser} />
                    <LoginSessions />
                    <Legal />
                </div>
            )}
        </section>
    );
};

export default SettingsPage;
