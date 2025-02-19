import HeaderTabs from "@/components/Header/HeaderTabs";
import HeaderCornerMenu from "@/components/Header/HeaderCornerMenu";

function Header() {
  return (
      <header
          className="flex justify-between border-b border-gray-200"
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
