import BillingPlan from '@/components/UserProfile/Billing/BillingPlan';
import Legal from '@/components/UserProfile/Compliance/Legal';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';
import Notifications from '@/components/UserProfile/Settings/Nofications';

const SettingsPage = () => {
    return (
        <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
            <PersonalInfoCard />
            <Other />
            <BillingPlan />
            <Notifications />
            <Security />
            <LoginSessions />
            <Legal />
        </div>
    );
};

export default SettingsPage;
