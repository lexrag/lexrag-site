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
                className="max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/LEXRAG__Landscape_sRGB_Two_Tone.svg"
                alt="lexrag logo dark"
                width={130}
                height={30}
                priority
                style={{ width: '130px', height: '30px' }}
            />
        );
    }
    return (
        <>
            <Image
                className="dark:hidden max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/LEXRAG__Landscape_sRGB_Two_Tone.svg"
                alt="lexrag logo light"
                width={130}
                height={30}
                priority
                style={{ width: '130px', height: '30px' }}
            />
            <Image
                className="hidden dark:block max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/LEXRAG__Landscape_sRGB_Two_Tone.svg"
                alt="lexrag logo dark"
                width={130}
                height={30}
                priority
                style={{ width: '130px', height: '30px' }}
            />
        </>
    );
};
