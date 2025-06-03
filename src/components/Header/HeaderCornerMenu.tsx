import SigninButton from "@/components/Header/SigninButton";
import UserIcon from "@/components/DropdownMenu/UserIcon";
import { getMe } from "@/api/auth/getMe";
import ThemeSwitch from "@/components/ThemeSwitch";
import Link from "next/link";

const HeaderCornerMenu = async () => {
    const user = await getMe();

    return (
        <div className="flex items-center justify-between">
            <ThemeSwitch />
            {user ? (
                <div className="flex items-center gap-4">
                    <div className="h-[40%] border-r-2 border-gray-200" />
                    <Link href="/chat">
                        <i className="ki-filled ki-message-text-2 text-lg mr-1 text-gray-600 hover:text-primary" />
                    </Link>
                    <div className="tab">
                        <UserIcon />
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-5">
                    <div className="h-[40%] border-r-2 border-gray-200" />
                    <div className="tab">
                        <SigninButton />
                    </div>
                </div>
            )}
        </div>

    );
};

export default HeaderCornerMenu; 
