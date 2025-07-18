import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import Legal from '@/components/UserProfile/Compliance/Legal';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';
import Notifications from '@/components/UserProfile/Settings/Nofications';

const SettingsPage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
            <PersonalInfoCard currentUser={currentUser} />
            <Other currentUser={currentUser} />
            <BillingPlan />
            <Notifications currentUser={currentUser} />
            <Security currentUser={currentUser} />
            <LoginSessions />
            <Legal currentUser={currentUser} />
        </div>
    );
};

export default SettingsPage;
