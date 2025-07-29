import { getMeServer } from '@/api/auth/getMeServer';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = async () => {
    const user = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-5xl gap-8">
            <PersonalInfoCard user={user} />
            <Other />
        </div>
    );
};

export default UserProfilePage;
