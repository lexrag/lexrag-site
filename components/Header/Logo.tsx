'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Logo = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    if (isHomePage) {
        return (
            <Image
                className="max-h-[16px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-dark.svg"
                alt="lexrag logo dark"
                width={80}
                height={16}
                priority
                style={{ width: '80px', height: '16px' }}
            />
        );
    }
    return (
        <>
            <Image
                className="dark:hidden max-h-[16px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo.svg"
                alt="lexrag logo light"
                width={80}
                height={16}
                priority
                style={{ width: '80px', height: '16px' }}
            />
            <Image
                className="hidden dark:block max-h-[16px] transition-transform duration-300 hover:scale-105"
                src="/media/lexrag-logo-dark.svg"
                alt="lexrag logo dark"
                width={80}
                height={16}
                priority
                style={{ width: '80px', height: '16px' }}
            />
        </>
    );
};
