'use client';

import { usePathname } from 'next/navigation';
import HeaderCornerMenu from '@/components/Header/HeaderCornerMenu';
import { Logo } from '@/components/Header/Logo';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className={`flex justify-between items-center w-full ${className}`}
      id="header"
    >
      <Logo isHomePage={pathname === '/'} />
      <HeaderCornerMenu />
    </header>
  );
};

export default Header;
