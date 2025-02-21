import {getMe} from "@/api/auth/getMe";
import UserIconClient from "@/components/DropdownMenu/UserIconClient";
import {User} from "@/types/User";

const UserIcon = async () => {
    const currentUser: User = await getMe()

    return (
        <UserIconClient user={currentUser} />
    )
}

export default UserIcon;
