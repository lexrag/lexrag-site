import Image from 'next/image';
import Link from 'next/link';

export default function SecurityCompliance({ className }: { className: string }) {
    return (
        <section className={`${className}`}>
            <h2 className="text-midnight-core text-[32px]/[110%] md:text-[64px]/[110%] mb-5">Security & Compliance</h2>
            <p className="text-midnight-core text-lg md:text-2xl mb-8 md:mb-[52px]">
                Deploy on-premises with full data control and compliance.
            </p>

            <div className="flex flex-wrap md:flex-nowrap md:justify-around justify-center gap-6 items-center">
                <Link
                    href="/security"
                    className="pt-8 px-2 pb-4 md:pt-[45px] bg-[#FFFFFF99] hover:bg-white transition-colors border border-white rounded-[24px] w-[160px] md:w-[282px] h-[187px] flex flex-col items-center"
                >
                    <Image
                        className="mb-5"
                        src={'/media/technology/security-1.svg'}
                        width={70}
                        height={70}
                        alt="image"
                    />
                    <span className="text-midnight-core md:mb-[43px] text-center">Enterprise-grade encryption</span>
                </Link>

                <Link
                    href="/security"
                    className="pt-8 px-2 pb-4 md:pt-[45px] bg-[#FFFFFF99] hover:bg-white transition-colors border border-white rounded-[24px] md:w-[282px] h-[187px] flex flex-col items-center"
                >
                    <Image
                        className="mb-5"
                        src={'/media/technology/security-2.svg'}
                        width={70}
                        height={70}
                        alt="image"
                    />
                    <span className="text-midnight-core md:mb-[43px] text-center">SG data-localization</span>
                </Link>

                <Link
                    href="/security"
                    className="pt-8 px-2 pb-4 md:pt-[45px] bg-[#FFFFFF99] hover:bg-white transition-colors border border-white rounded-[24px] md:w-[282px] h-[187px] flex flex-col items-center"
                >
                    <Image
                        className="mb-5"
                        src={'/media/technology/security-3.svg'}
                        width={70}
                        height={70}
                        alt="image"
                    />
                    <span className="text-midnight-core md:mb-[43px] text-center">Compliance-ready</span>
                </Link>
            </div>
        </section>
    );
}
