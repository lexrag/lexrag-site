import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import {logOut} from "@/api/auth/logOut";

const Dropdown = ({user}: any) => {
    return (
        <div role="tooltip" className="base-Popper-root p-0 absolute z-[1000] translate-x-[-212px] translate-y-[10px]">
            <div className="menu-container">
                <div className="menu-dropdown menu-default light:border-gray-300 w-[200px] md:w-[250px]">

                    <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                        <div className="flex items-center gap-2 max-w-[80%] overflow-hidden">
                            <div className="flex flex-col gap-1.5">
                                <Link href="#" className="text-sm text-gray-800 hover:text-primary font-semibold leading-none">
                                    {user?.first_name} {user?.last_name}
                                </Link>
                                <Link href="#"
                                      className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                                    {user?.email}
                                </Link>
                            </div>
                        </div>

                        <span className="badge badge-xs badge-primary badge-outline">Pro</span>
                    </div>

                    <div className="menu-separator"></div>

                    <div className="flex flex-col">
                        <div className="menu-item">
                            <Link className="menu-link" href="/user-profile">
                                <div className="menu-icon"><i className="ki-filled ki-profile-circle"></i></div>
                                <div className="menu-title">My Profile</div>
                            </Link>
                        </div>
                    </div>

                    <div className="menu-separator"></div>

                    <div className="flex flex-col">
                        <div className="menu-item mb-0.5">
                            <ThemeSwitch />
                        </div>

                        <div className="menu-item px-4 py-1.5">
                            <button onClick={logOut} className="btn btn-sm btn-light justify-center">Logout</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dropdown;
