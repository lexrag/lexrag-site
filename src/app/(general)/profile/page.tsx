import PageTitle from "@/components/Layout/PageTitle";
import PersonalInfoCard from "@/components/UserProfile/PersonalInfoCard";
import {getMe} from "@/api/auth/getMe";
import {User} from "@/types/User";

const UserProfilePage = async () => {
    const currentUser: User = await getMe();

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
