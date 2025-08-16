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
                className="max-h-[25px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag_logo_white.svg"
                alt="lexrag logo white"
                width={130}
                height={30}
                priority
            />
        );
    }

    if (isHomePage) {
        return (
            <Image
                className="max-h-[30px] transition-transform duration-300 hover:scale-[1.04]"
                src="/media/lexrag_logo_primary_two_tone.svg"
                alt="lexrag logo dark"
                width={130}
                height={30}
                priority

            />
        );
    }
    return (
        <>
            <Image
                className="dark:hidden max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag_logo_primary_two_tone.svg"
                alt="lexrag logo light"
                width={130}
                height={30}
                priority
            />
            <Image
                className="hidden dark:block max-h-[30px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag_logo_primary_two_tone.svg"
                alt="lexrag logo dark"
                width={130}
                height={30}
                priority
            />
        </>
    );
};
