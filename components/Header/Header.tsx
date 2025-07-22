'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
    className?: string;
    onOpenSidebar?: () => void;
}

const Header = ({ className = '', onOpenSidebar }: HeaderProps) => {
    const pathname = usePathname();

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-[0.91rem] z-50 py-5 px-4 flex justify-between items-center transition-all duration-300',
                'before:content-[" "] before:absolute before:inset-0 before:opacity-60 before:backdrop-blur-md before:z-[-1]',
                className,
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                aria-label="Open menu"
                onClick={onOpenSidebar}
            >
                <Menu className="size-6" />
            </Button>
            <MegaMenu isHomePage={pathname === '/'} />
        </header>
    );
};

export default Header;
