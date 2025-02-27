import HeaderTabs from "@/components/Header/HeaderTabs";
import HeaderCornerMenu from "@/components/Header/HeaderCornerMenu";

const Header = ({ className = "" }) => {
  return (
        <header
        className={`flex justify-between items-center w-full pl-[15%] pr-[15%] ${className}`}
        data-sticky="true"
        data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
        data-sticky-name="header"
        id="header"
    >
          <HeaderTabs />
          <HeaderCornerMenu />
      </header>
  )
}

export default Header;
