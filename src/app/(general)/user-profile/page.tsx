import PersonalInfoCard from "@/components/UserProfile/PersonalInfoCard";
import {getMe} from "@/api/auth/getMe";
import {User} from "@/types/User";

const UserProfilePage = async () => {
    const currentUser: User = await getMe();

    return (
        <section className="mt-5">
            <div className="mb-5 h-[50px] border-b border-gray-200">
                <h1 className="font-medium text-lg text-gray-900">User Profile</h1>
            </div>

            <PersonalInfoCard currentUser={currentUser} />
        </section>
    )
}

export default UserProfilePage;
