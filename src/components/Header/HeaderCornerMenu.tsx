import SigninButton from "@/components/Header/SigninButton";
import UserIcon from "@/components/DropdownMenu/UserIcon";
import {getMe} from "@/api/auth/getMe";
import ThemeSwitch from "@/components/ThemeSwitch";

const HeaderCornerMenu = async () => {
    const user = await getMe();

    return (
        <div className="flex items-center justify-between gap-5">
            <ThemeSwitch />
            {user ? (
                <div className="flex items-center gap-8">
                    <div className="h-[40%] border-r-2 border-gray-200" />
                    <div className="tab">
                        <UserIcon />
                    </div>
                </div>
            ) : (
                <SigninButton />
            )}
        </div>
    )
};

export default HeaderCornerMenu;
