import PageTitle from "@/components/Layout/PageTitle";
import PersonalInfoCard from "@/components/UserProfile/PersonalInfoCard";
import getMeServer from "@/api/auth/getMeServer";
import {User} from "@/types/User";

const UserProfilePage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <section className="">
            <PageTitle />
            {currentUser && (
                <PersonalInfoCard currentUser={currentUser} />
            )}
        </section>
    )
}

export default UserProfilePage;
