'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import HeaderCornerMenu from '@/components/Header/HeaderCornerMenu';
import { Logo } from '@/components/Header/Logo';

interface HeaderProps {
    className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
    const pathname = usePathname();

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 px-[16%] py-5 flex justify-between items-center transition-all duration-300',
                'before:content-[""] before:absolute before:inset-0 before:opacity-60 before:backdrop-blur-md before:z-[-1]',
                className,
            )}
        >
            <Logo isHomePage={pathname === '/'} />
            <HeaderCornerMenu />
        </header>
    );
};

export default Header;
