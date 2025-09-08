import { Metadata } from 'next';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import { LinkPrimary } from '@/components/ui/link-primary';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';

export const metadata: Metadata = {
    title: 'Benefits Deep-Dive Sections',
};

interface TFeatures {
    title: string;
    img: string;
    imgActive: string;
    links: {
        label: string;
        href: string;
        type?: 'demo';
    }[];
    items: {
        img: string;
        label: string;
    }[];
}

const FEATURES: TFeatures[] = [
    {
        title: 'No AI Hallucinations',
        img: '/media/benefits/benefints-1.svg',
        imgActive: '/media/benefits/benefits-active-1.svg',
        links: [
            {
                label: 'Graph-Vector Engine',
                href: '/benefits',
            },
            {
                label: 'Technology',
                href: '/technology',
            },
        ],
        items: [
            {
                img: '/media/benefits/benefits-item-3.svg',
                label: 'Generic AI tools invent cases, unusable in court or memos.',
            },
            {
                img: '/media/benefits/benefits-item-2.svg',
                label: 'Graph-Vector Engine + legal-only corpus → verifiable, hallucination-free output.',
            },
            {
                img: '/media/benefits/benefits-item-1.svg',
                label: 'Court-ready answers with citations.',
            },
        ],
    },
    {
        title: 'Explainability & Traceability',
        img: '/media/benefits/benefits-2.svg',
        imgActive: '/media/benefits/benefits-active-2.svg',
        links: [
            {
                label: 'Watch a traceable answer in action',
                href: '/benefits',
            },
            {
                label: 'Watch demo',
                href: '/benefits',
                type: 'demo',
            },
        ],
        items: [
            {
                img: '/media/benefits/benefits-item-4.svg',
                label: 'Lawyers can’t trust black-box AI; need transparent logic.',
            },
            {
                img: '/media/benefits/benefits-item-5.svg',
                label: 'Every answer links back to statutes, precedents, or contracts in your documents.',
            },
            {
                img: '/media/benefits/benefits-item-6.svg',
                label: 'Easy to show stakeholders the source.',
            },
        ],
    },
    {
        title: 'Faster & Cheaper Legal Workflows',
        img: '/media/benefits/benefits-3.svg',
        imgActive: '/media/benefits/benefits-active-3.svg',
        links: [
            {
                label: 'Legal Research & Document Review',
                href: '/document-works',
            },
            {
                label: 'Services',
                href: '/services',
            },
        ],
        items: [
            {
                img: '/media/benefits/benefits-item-7.svg',
                label: 'Legal research and document review take hours and junior staff.',
            },
            {
                img: '/media/benefits/benefits-item-8.svg',
                label: 'Automates research, review, and case triage → hours saved, costs cut.',
            },
            {
                img: '/media/benefits/benefits-item-9.svg',
                label: '8 hours of work reduced to 15 minutes.',
            },
        ],
    },
    {
        title: 'Peer Review & Expert Support',
        img: '/media/benefits/benefits-4.svg',
        imgActive: '/media/benefits/benefits-active-4.svg',
        links: [
            {
                label: 'Synthetic Panel',
                href: '/benefits',
            },
            {
                label: 'Services',
                href: '/services',
            },
        ],
        items: [
            {
                img: '/media/benefits/benefits-item-10.svg',
                label: 'Solo lawyers lack second opinions; firms spend time on peer review.',
            },
            {
                img: '/media/benefits/benefits-item-11.svg',
                label: 'AI Expert Panel simulates multi-lawyer discussion for reliable “second opinion”.',
            },
            {
                img: '/media/benefits/benefits-item-12.svg',
                label: 'Instant peer review at fraction of cost.',
            },
        ],
    },
    {
        title: 'Flexible Pricing',
        img: '/media/benefits/benefits-5.svg',
        imgActive: '/media/benefits/benefits-active-5.svg',
        links: [
            {
                label: 'See pricing',
                href: '/price',
            },
        ],
        items: [
            {
                img: '/media/benefits/benefits-item-13.svg',
                label: 'High-cost subscriptions lock firms into unused seats.',
            },
            {
                img: '/media/benefits/benefits-item-14.svg',
                label: 'Pay-as-you-go usage model + free trial → lower entry barrier.',
            },
            {
                img: '/media/benefits/benefits-item-15.svg',
                label: 'Solo practitioners and small firms can adopt instantly without risk.',
            },
        ],
    },
];

const Benefits = () => {
    return (
        <div className="overflow-y-auto">
            <Header />

            <div className="max-w-[1200px] mx-auto pt-20 md:pt-40 px-4 md:px-0">
                <h2 className="text-midnight-core text-2xl md:text-[64px] leading-tight md:leading-[110%] mb-8 md:mb-[83px]">
                    Benefits Deep-Dive Sections
                </h2>

                {FEATURES.map((item, idx) => {
                    return (
                        <div
                            key={item.title}
                            className="p-4 md:p-10 rounded-3xl border-white bg-gradient-to-t from-[#FFFFFF73] to-[#FFFFFF33] border mb-6 md:mb-10"
                        >
                            <div
                                className={cx(
                                    'flex gap-6 md:gap-[100px]',
                                    'flex-col md:flex-row',
                                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                                )}
                            >
                                <div className="flex flex-col items-center md:items-start">
                                    <h5 className="text-midnight-core text-xl md:text-[36px] leading-tight md:leading-[110%] max-w-full md:max-w-[396px] mb-1 md:mb-4 text-center md:text-left">
                                        <span className="inline-block mr-2">{idx + 1}.</span>
                                        {item.title}
                                    </h5>

                                    <div className="group relative w-[150px] h-[150px] md:w-[250px] md:h-[250px] hidden sm:block">
                                        <Image
                                            src={item.img}
                                            className={cx('absolute group-hover:opacity-0 transition-opacity')}
                                            alt="img"
                                            width={250}
                                            height={250}
                                        />
                                        <Image
                                            src={item.imgActive}
                                            className="absolute group-hover:opacity-100 opacity-0 transition-opacity"
                                            alt="img"
                                            width={250}
                                            height={250}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-3 md:gap-4">
                                    {item.items.map((item, idx) => {
                                        return (
                                            <div className="flex gap-3 md:gap-6" key={item.label}>
                                                <div className="w-16 h-16 md:w-[102px] md:h-[102px] rounded-2xl md:rounded-3xl flex items-center justify-center bg-[#AC9FEE] flex-shrink-0">
                                                    <Image
                                                        src={item.img}
                                                        className="w-[40px] h-[40x] md:w-20 md:h-20"
                                                        width={80}
                                                        height={80}
                                                        alt="icon"
                                                    />
                                                </div>
                                                <div className="bg-[#DED8F8] py-2 md:py-3 px-3 md:px-5 rounded-2xl md:rounded-3xl flex-1">
                                                    {idx === 0 && (
                                                        <div className="text-[#EE5000] rounded-full border border-[#EE5000] py-0.5 px-2 md:px-3 font-medium bg-[#FFEFE5] w-max text-xs md:text-base">
                                                            Problem
                                                        </div>
                                                    )}
                                                    {idx === 1 && (
                                                        <div className="text-phase-green rounded-full border border-phase-green py-0.5 px-2 md:px-3 font-medium bg-[#E6FCF1] w-max text-xs md:text-base">
                                                            Solution
                                                        </div>
                                                    )}
                                                    {idx === 2 && (
                                                        <div className="text-axis-indigo rounded-full border border-axis-indigo py-0.5 px-2 md:px-3 font-medium bg-transparent w-max text-xs md:text-base">
                                                            Outcome
                                                        </div>
                                                    )}

                                                    <p className="text-midnight-core mt-2 md:mt-2.5 text-sm md:text-base">
                                                        {item.label}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mt-6 md:mt-10">
                                {item.links.map((item, idx) => {
                                    return (
                                        <LinkPrimary
                                            className={cx(
                                                'w-full sm:w-auto text-center',
                                                item.type === 'demo' && 'flex items-center justify-center gap-1',
                                            )}
                                            variant={idx === 0 ? 'primary' : 'outline'}
                                            href={item.href}
                                            key={item.label}
                                        >
                                            {item.type === 'demo' && (
                                                <Image
                                                    className="w-5 h-5 md:w-6 md:h-6"
                                                    src="/media/technology/video.svg"
                                                    alt="video"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {item.label}
                                        </LinkPrimary>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
};

export default Benefits;
