import ThemeSwitch from "@/components/ThemeSwitch";
import {logOut} from "@/api/auth/logOut";

const HeaderAuth = () => {
    const userName = "Alex" //TODO: rewrite this logic here

    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <ThemeSwitch />
            </div>
            <div className="tab">
                <button onClick={logOut} className="btn btn-primary h-[2rem]">
                    Log out
                </button>
            </div>
            <div className='h-[40%] border-r-2 border-gray-200' />
            <div className="tab">
                <div
                    className="size-[34px] rounded-full inline-flex items-center justify-center text-md font-semibold border border-primary-clarity bg-primary-light text-primary">
                    {userName.slice(0, 1)}
                </div>
            </div>
        </div>

    )
}

export default HeaderAuth;
