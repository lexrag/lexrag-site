'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeaderCornerMenu from './HeaderCornerMenu';
import { links } from './HeaderLinks';
import { Logo } from './Logo';

interface HeaderProps {
    className?: string;
    onOpenSidebar?: () => void;
}

const Header = ({ className = '', onOpenSidebar }: HeaderProps) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 lg:py-6 py-2 max-w-7xl mx-auto transition-all duration-300 bg-cloud-tint lg:bg-transparent px-3',
                className,
            )}
        >
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2 py-[15px] px-1 lg:px-12 rounded-4xl lg:bg-white/10 bg-white/0 lg:shadow-[0_0_8.88px_0_rgba(0,0,0,0.1)] lg:backdrop-blur-[8.88px] lg:border-t border-[#fff] mr-auto">
                    {onOpenSidebar && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden mr-2"
                            aria-label="Open menu"
                            onClick={onOpenSidebar}
                        >
                            <Menu className="size-6" />
                        </Button>
                    )}
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                    <ul className="lg:flex gap-2 hidden">
                        {links.map((item) => {
                            const isActive =
                                item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);

                            return (
                                <li key={item.name}>
                                    <Link
                                        className={cn(
                                            'text-base font-semibold px-6 py-4 rounded-full transition-all text-midnight-core',
                                            isActive ? 'bg-phase-green' : 'hover:bg-phase-green',
                                        )}
                                        href={item.href}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <HeaderCornerMenu />

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden ml-3 hover:bg-transparent hover:opacity-80 transition-all duration-500 relative"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={cn(
                                'size-6 text-axis-indigo absolute inset-0 transition-opacity duration-300',
                                isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                            )}
                        />
                        <X
                            className={cn(
                                'size-6 text-axis-indigo absolute inset-0 transition-opacity duration-300',
                                isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
                            )}
                        />
                    </div>
                </Button>
            </div>

            <div
                className={cn(
                    'grid transition-all duration-300 lg:hidden',
                    isMobileMenuOpen ? 'grid-rows-[1fr] pt-10' : 'grid-rows-[0fr]',
                )}
            >
                <div className="overflow-hidden sm:px-10 px-2">
                    <ul
                        className={cn(
                            'flex flex-col gap-6 transition-opacity duration-500',
                            isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        {links.map((item) => (
                            <li key={item.name}>
                                <Link
                                    className="text-axis-indigo hover:text-phase-green transition-colors"
                                    href={item.href}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-[28px] mb-4 flex gap-2">
                        <Link className="inline-block hover:opacity-80 transition-opacity" href={'/'}>
                            <Image
                                src="/media/icons/linkedin-secondary.svg"
                                alt="linkedin"
                                width={36}
                                height={36}
                                priority
                                style={{ width: '36px', height: '36px' }}
                            />
                        </Link>
                        <Link className="inline-block hover:opacity-80 transition-opacity" href={'/'}>
                            <Image
                                src="/media/icons/mail.svg"
                                alt="linkedin"
                                width={36}
                                height={36}
                                priority
                                style={{ width: '36px', height: '36px' }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
