import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';

type Feature = {
    id: number;
    img: string;
    title: string;
    description: string;
    linkLabel: string;
    href: string;
    technology?: string;
    security?: string;
};

const FEATURES: Feature[] = [
    {
        id: 1,
        img: '/media/service/how-it-works-1.svg',
        title: 'Ingest',
        description: 'Upload your documents or type a legal question.',
        linkLabel: 'Graph reasoning & traceability',
        href: '/service',
        technology: '/technology',
    },
    {
        id: 2,
        img: '/media/service/how-it-works-2.svg',
        title: 'Graph Reasoning',
        description: 'Our AI maps statutes, case law, and prior research into a reasoning graph.',
        linkLabel: 'Graph reasoning & traceability',
        href: '/service',
        technology: '/technology',
    },
    {
        id: 3,
        img: '/media/service/how-it-works-3.svg',
        title: 'Explain & Cite',
        description: 'Get a concise answer with full citations you can verify and rely on.',
        linkLabel: 'Security & compliance (PDPA/GDPR/ISO/SOC2)',
        href: '/service',
        technology: '/technology',
        security: '/security',
    },
];

export default function HowItWorks({ className }: { className: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                How it works
            </h2>

            <div className="flex gap-6 flex-wrap lg:flex-nowrap">
                {FEATURES.map(({ id, img, title, description, linkLabel, href, technology, security }, idx) => (
                    <div
                        key={id}
                        className="p-6 flex justify-center flex-col items-center lg:w-[384px] w-full rounded-3xl bg-gradient-to-br from-[#BBBCFA] to-[#694AFF]"
                    >
                        <div className="flex gap-8 mr-auto">
                            <span className="text-[64px]">{`0${idx + 1}`}</span>
                            <Image
                                src={img}
                                className="mb-6 mt-3 sm:w-[200px] sm:h-[200px] w-[120px] h-[120px]"
                                alt={title}
                                width={200}
                                height={200}
                            />
                        </div>
                        <h6 className="font-semibold text-2xl mb-2 mr-auto">{title}</h6>
                        <p className="text-[16px] leading-[110%] font-normal mb-6 mr-auto">{description}</p>
                        <Link className="mr-auto underline hover:no-underline text-[14px]" href={href}>
                            {linkLabel}
                        </Link>
                        <div className="mt-6 flex flex-wrap justify-start w-full gap-[15px]">
                            {technology && (
                                <Link
                                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                                    href={technology}
                                >
                                    Technology
                                </Link>
                            )}
                            {security && (
                                <Link
                                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                                    href={security}
                                >
                                    Security
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
