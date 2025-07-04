import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            {currentUser && (
                <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                    <PersonalInfoCard currentUser={currentUser} />
                    <Other />
                </div>
            )}
        </section>
    );
};

export default UserProfilePage;
