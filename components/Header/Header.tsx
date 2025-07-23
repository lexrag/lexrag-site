'use client';

import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeaderCornerMenu from './HeaderCornerMenu';
import { Logo } from './Logo';

interface HeaderProps {
    className?: string;
    onOpenSidebar?: () => void;
}

const Header = ({ className = '', onOpenSidebar }: HeaderProps) => {
    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-[0.91rem] z-50 py-5 px-4 flex justify-between items-center transition-all duration-300',
                'before:content-[" "] before:absolute before:inset-0 before:opacity-60 before:backdrop-blur-md before:z-[-1]',
                className,
            )}
        >
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2"
                    aria-label="Open menu"
                    onClick={onOpenSidebar}
                >
                    <Menu className="size-6" />
                </Button>
                <Logo />
            </div>
            <HeaderCornerMenu />
        </header>
    );
};

export default Header;
