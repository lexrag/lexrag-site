import HeaderTabs from "@/components/Header/HeaderTabs";
import HeaderCornerMenu from "@/components/Header/HeaderCornerMenu";

const Header = ({ className = "" }) => {
  return (
        <header
        className={`flex justify-between items-center w-full pl-[16%] pr-[16%] ${className}`}
        id="header"
    >
          <HeaderTabs />
          <HeaderCornerMenu />
      </header>
  )
}

export default Header;
