import Image from 'next/image';

type LogoProps = {
    isHomePage: boolean;
};

export const Logo = ({ isHomePage }: LogoProps) => {
    return (
        <>
            {isHomePage ? (
                <Image
                    className="max-h-[16px] transition-transform duration-300 hover:scale-105"
                    src="/media/lexrag-logo-dark.svg"
                    alt="lexrag logo dark"
                    width={80}
                    height={16}
                    priority
                    style={{ width: '80px', height: '16px' }}
                />
            ) : (
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
            )}
        </>
    );
};
