import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import PersonalInfoCard from '@/components/UserProfile/PersonalInfoCard';

const UserProfilePage = async () => {
  const currentUser: User = await getMeServer();

  return (
    <section>
      <PageTitle />
      {currentUser && <PersonalInfoCard currentUser={currentUser} />}
    </section>
  );
};

export default UserProfilePage;
