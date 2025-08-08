'use client';

import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeaderCornerMenu from './HeaderCornerMenu';
import HeaderNavigation from './HeaderNavigation';
import { Logo } from './Logo';

interface HeaderProps {
    className?: string;
    onOpenSidebar?: () => void;
}

const Header = ({ className = '', onOpenSidebar }: HeaderProps) => {
    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-[0.91rem] z-50 py-5 px-12 flex justify-between items-center transition-all duration-300',
                'before:content-[" "] before:absolute before:inset-0 before:z-[-1]',
                className,
            )}
        >
            <div className="h-12 px-6 py-8 inline-flex justify-center items-center gap-2 border-[0.1] rounded-full bg-[rgba(255,255,255,0.1)] shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] backdrop-blur-[2.78px]">
                <div className="flex w-full pr-5 items-center">
                    <Logo />
                </div>
                <HeaderNavigation />
            </div>
            <div className="flex gap-8">
                <HeaderCornerMenu />
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden mr-2"
                    aria-label="Open menu"
                    onClick={onOpenSidebar}
                >
                    <Menu className="size-6" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
