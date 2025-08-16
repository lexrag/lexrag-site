'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LiquidGlass from '@/components/liquid-glass';
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
    const [currentHash, setCurrentHash] = useState('');

    useEffect(() => {
        setCurrentHash(window.location.hash);

        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 lg:py-6 py-2 max-w-7xl mx-auto transition-all duration-300 md:bg-cloud-tint lg:bg-transparent px-3',
                className,
            )}
        >
            <div className="flex justify-between items-center ">
                <div className="md:hidden flex items-center gap-2 py-[15px] px-1">
                    {onOpenSidebar && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                            aria-label="Open menu"
                            onClick={onOpenSidebar}
                        >
                            <Menu className="size-6" />
                        </Button>
                    )}
                    <Link href={'/'} onClick={handleLogoClick}>
                        <div className="scale-80">
                            <Logo />
                        </div>
                    </Link>
                </div>

                <LiquidGlass
                    centered={false}
                    compact
                    displacementScale={50}
                    blurAmount={0.01}
                    saturation={130}
                    aberrationIntensity={2}
                    elasticity={0}
                    cornerRadius={400}
                    mode="prominent"
                    padding="0px"
                    className="mr-auto hidden md:block"
                    style={{
                        boxShadow: 'none',
                        filter: 'none',
                    }}
                >
                    <div
                        className="flex items-center gap-2 py-[15px] px-1 lg:px-7 rounded-4xl lg:bg-white/10 bg-white/0 lg:border-t border-[#fff]"
                        style={{
                            textShadow: 'none',
                        }}
                    >
                        <Link href={'/'} onClick={handleLogoClick}>
                            <Logo />
                        </Link>
                        <ul className="lg:flex gap-2 hidden">
                            {links.map((item) => {
                                const isActive = pathname === '/' && currentHash === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link
                                            className={cn(
                                                'relative text-base font-semibold px-6 py-3 rounded-full transition-colors text-[#593EDC]',
                                                'after:content-[""] after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:bg-[#06DF72] after:w-0 after:transition-all after:duration-300 after:origin-center after:-translate-x-1/2',
                                                isActive ? 'after:w-3/4' : 'hover:after:w-3/5',
                                            )}
                                            href={item.href}
                                            onClick={(e) => handleLinkClick(e, item.href)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </LiquidGlass>
                <div className="scale-90 md:scale-100">
                    <HeaderCornerMenu />
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden ml-3 hover:bg-transparent hover:opacity-80 transition-all duration-100 relative"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={cn(
                                'size-6 text-axis-indigo absolute inset-0 transition-opacity duration-100',
                                isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                            )}
                        />
                        <X
                            className={cn(
                                'size-6 text-axis-indigo absolute inset-0 transition-opacity duration-100',
                                isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
                            )}
                        />
                    </div>
                </Button>
            </div>

            <div
                className={cn(
                    'grid transition-all duration-300 lg:hidden',
                    isMobileMenuOpen
                        ? 'grid-rows-[1fr] pt-10 backdrop-blur-md bg-white/10 rounded-[20px] border border-white/20'
                        : 'grid-rows-[0fr]',
                )}
            >
                <div className="overflow-hidden sm:px-10 px-2">
                    <ul
                        className={cn(
                            'flex flex-col gap-6 transition-opacity duration-500',
                            isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        {links.map((item) => {
                            const isActive = pathname === '/' && currentHash === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        className={cn(
                                            'relative text-base font-semibold px-6 py-4 rounded-full transition-colors text-[#593EDC]',
                                            'after:content-[""] after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:bg-[#06DF72] after:w-0 after:transition-all after:duration-300 after:origin-center after:-translate-x-1/2',
                                            isActive ? 'after:w-3/4' : 'hover:after:w-3/4',
                                        )}
                                        href={item.href}
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
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
