import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = () => {
    return (
        <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
            <PersonalInfoCard />
            <Other />
        </div>
    );
};

export default UserProfilePage;
