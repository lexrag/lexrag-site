'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface LogoProps {
    variant?: 'default' | 'white';
}

export const Logo = ({ variant }: LogoProps) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    if (variant === 'white') {
        return (
            <Image
                className="max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/LEXRAG__Landscape_sRGB_White.svg"
                alt="lexrag logo white"
                width={130}
                height={30}
                priority
                style={{ width: '130px', height: '30px' }}
            />
        );
    }

    if (isHomePage) {
        return (
            <Image
                className="max-h-[48px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo dark"
                width={280}
                height={48}
                priority
                style={{ width: '280px', height: '48px' }}
            />
        );
    }
    return (
        <>
            <Image
                className="dark:hidden max-h-[48px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo light"
                width={280}
                height={48}
                priority
                style={{ width: '280px', height: '48px' }}
            />
            <Image
                className="hidden dark:block max-h-[48px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo dark"
                width={280}
                height={48}
                priority
                style={{ width: '280px', height: '48px' }}
            />
        </>
    );
};
