import HeaderTabs from "@/components/Header/HeaderTabs";
import SigninButton from "@/components/Header/SigninButton";

const Header = ({ className = "" }) => {
    return (

        <header
            className={`flex items-center justify-between pl-[15%] pr-[15%] ${className}`}
            data-sticky="true"
            data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
            data-sticky-name="header"
            id="header"
        >
            <HeaderTabs />
            <SigninButton />

        </header>

        )
        }

export default Header;