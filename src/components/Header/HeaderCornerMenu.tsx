import SigninButton from "@/components/Header/SigninButton";
import UserIcon from "@/components/DropdownMenu/UserIcon";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const HeaderCornerMenu = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    let user = null;
    if (session) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(session, secret);

            if (payload?.is_active) {
                user = payload;
            }
        } catch (err) {
            console.error("Error token decoding:", err);
        }
    }

    return user ? (
        <div className="flex items-center gap-8">
            <div className="h-[40%] border-r-2 border-gray-200" />
            <div className="tab">
                <UserIcon />
            </div>
        </div>
    ) : (
        <SigninButton />
    );
};

export default HeaderCornerMenu;