"use client"

import HeaderCornerMenu from "@/components/Header/HeaderCornerMenu";
import {Logo} from "@/components/Header/Logo";
import {usePathname} from "next/navigation";

interface HeaderProps {
    className?: string;
}

const Header = ({className = " "}: HeaderProps) => {
    const pathname = usePathname();

    return (
        <header
            className={`flex justify-between items-center w-full pl-[16%] pr-[16%] ${className}`}
            id="header"
        >
            <Logo isHomePage={pathname === "/"} />
            <HeaderCornerMenu/>
        </header>
    )
}

export default Header;
