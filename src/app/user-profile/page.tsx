import Header from "@/components/Header/Header";
import PersonalInfoCard from "@/components/UserProfile/PersonalInfoCard";
import {getMe} from "@/api/auth/getMe";
import {User} from "@/types/User";
import Footer from "@/components/Layout/Footer";

const UserProfilePage = async () => {
    const currentUser: User = await getMe();

    return (
        <div className="h-[100vh]">
            <Header/>
            <section className="mt-5">
                <div className="mb-5 h-[50px] border-b border-gray-200">
                    <h1 className="font-medium text-lg text-gray-900">User Profile</h1>
                </div>

                <PersonalInfoCard currentUser={currentUser} />
            </section>
            <Footer />
        </div>

    )
}

export default UserProfilePage;
