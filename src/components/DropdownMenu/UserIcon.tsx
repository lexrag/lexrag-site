import {getMe} from "@/api/auth/getMe";
import UserIconClient from "@/components/DropdownMenu/UserIconClient";

const UserIcon = async () => {
    const currentUser = await getMe()

    return (
        <UserIconClient user={currentUser} />
    )
}

export default UserIcon;
