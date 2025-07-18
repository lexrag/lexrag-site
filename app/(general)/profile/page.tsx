import getUserInfoServer from '@/api/user/getUserInfoServer';
import { User } from '@/types/User';
import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = async () => {
    const currentUser: User = await getUserInfoServer();

    return (
        <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
            <PersonalInfoCard currentUser={currentUser} />
            <Other currentUser={currentUser} />
        </div>
    );
};

export default UserProfilePage;
