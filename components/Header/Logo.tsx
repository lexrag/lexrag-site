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
                className="max-h-[38px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo dark"
                width={224}
                height={38}
                priority
                style={{ width: '224px', height: '38px' }}
            />
        );
    }
    return (
        <>
            <Image
                className="dark:hidden max-h-[38px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo light"
                width={224}
                height={38}
                priority
                style={{ width: '224px', height: '38px' }}
            />
            <Image
                className="hidden dark:block max-h-[38px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-secondary.svg"
                alt="lexrag logo dark"
                width={224}
                height={38}
                priority
                style={{ width: '224px', height: '38px' }}
            />
        </>
    );
};
