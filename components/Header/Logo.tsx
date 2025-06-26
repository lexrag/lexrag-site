import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
    isHomePage: boolean;
};

export const Logo = ({ isHomePage }: LogoProps) => {
    return (
        <Link href="/" className="cursor-pointer flex items-center" scroll={false}>
            {isHomePage ? (
                <Image
                    className="max-h-[20px] mr-5 transition-transform duration-300 hover:scale-105"
                    src="/media/lexrag-logo-dark.svg"
                    alt="lexrag logo dark"
                    width={100}
                    height={20}
                    priority
                    style={{ width: '100px', height: '20px' }}
                />
            ) : (
                <>
                    <Image
                        className="dark:hidden max-h-[20px] mr-5 transition-transform duration-300 hover:scale-105"
                        src="/media/lexrag-logo.svg"
                        alt="lexrag logo light"
                        width={100}
                        height={20}
                        priority
                        style={{ width: '100px', height: '20px' }}
                    />
                    <Image
                        className="hidden dark:block max-h-[20px] mr-5 transition-transform duration-300 hover:scale-105"
                        src="/media/lexrag-logo-dark.svg"
                        alt="lexrag logo dark"
                        width={100}
                        height={20}
                        priority
                        style={{ width: '100px', height: '20px' }}
                    />
                </>
            )}
        </Link>
    );
};
