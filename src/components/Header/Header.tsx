import HeaderCornerMenu from "@/components/Header/HeaderCornerMenu";
import {Logo} from "@/components/Header/Logo";

interface HeaderProps {
    className?: string;
    isHomePage?: boolean;
}

const Header = ({className = " ", isHomePage = false}: HeaderProps) => {
    return (
        <header
            className={`flex justify-between items-center w-full pl-[16%] pr-[16%] ${className}`}
            id="header"
        >
            <Logo isHomePage={isHomePage} />
            <HeaderCornerMenu/>
        </header>
    )
}

export default Header;
