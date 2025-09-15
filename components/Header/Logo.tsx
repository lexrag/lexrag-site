'use client';

import Image from 'next/image';
import { useSectionBackground } from '@/hooks/use-section-background';

interface LogoProps {
    variant?: 'default' | 'white';
}

export const Logo = ({ variant }: LogoProps) => {
    const currentBackground = useSectionBackground();

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

    const logoSrc =
        currentBackground === 'dark'
            ? '/media/lexrag_logo_primary_two_tone_white.svg'
            : '/media/lexrag_logo_primary_two_tone.svg';

    return (
        <Image
            className="max-h-[30px] transition-transform duration-300 hover:scale-[1.04]"
            src={logoSrc}
            alt="lexrag logo"
            width={130}
            height={30}
            priority
        />
    );
};
