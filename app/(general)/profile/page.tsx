import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import BasicSettingsCard from '@/components/UserProfile/BasicSettingsCard';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            {currentUser && (
                <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                    <PersonalInfoCard currentUser={currentUser} />
                    <BasicSettingsCard currentUser={currentUser} />
                </div>
            )}
        </section>
    );
};

export default UserProfilePage;
