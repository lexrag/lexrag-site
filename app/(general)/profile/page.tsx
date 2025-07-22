import Other from '@/components/UserProfile/Other';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = () => {
    return (
        <div className="flex flex-col w-full max-w-5xl gap-8">
            <PersonalInfoCard />
            <Other />
        </div>
    );
};

export default UserProfilePage;
