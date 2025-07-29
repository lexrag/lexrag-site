import { getMeServer } from '@/api/auth/getMeServer';
import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import Legal from '@/components/UserProfile/Compliance/Legal';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';
import Notifications from '@/components/UserProfile/Settings/Nofications';

const SettingsPage = async () => {
    const user = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-5xl gap-8 items-center justify-center">
            <PersonalInfoCard user={user} />
            <Other />
            <BillingPlan />
            <Notifications />
            <Security user={user} />
            <LoginSessions />
            <Legal user={user} />
        </div>
    );
};

export default SettingsPage;
