import HeaderTabs from "@/components/Header/HeaderTabs";
import HeaderAuth from "@/components/Header/HeaderAuth";

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
          <HeaderAuth />
      </header>
  )
}

export default Header;