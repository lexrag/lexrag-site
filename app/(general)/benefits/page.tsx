import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import { cn } from '@/lib/utils';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
import Tilt3D from '@/components/tilt3d/Tilt3D';
import { LinkPrimary } from '@/components/ui/link-primary';
import SecurityCompliance from '@/components/technology/SecurityCompliance';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';

export const metadata: Metadata = {
    title: 'Benefits Deep-Dive Sections',
};

type Badge = {
    icon: string;
    label: string;
    href: string;
};

const BADGES: Badge[] = [
    { icon: '/media/technology/explainable.svg', label: 'Explainable & Source-Traceable', href: '/technology' },
    { icon: '/media/technology/search.svg', label: 'No AI Hallucinations', href: '/technology' },
    { icon: '/media/technology/vendor.svg', label: 'Interoperable with Any LLM', href: '/technology' },
    { icon: '/media/technology/acp.svg', label: 'API/MCP-ready', href: '/technology' },
];

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

<div className="absolute inset-0 top-0 max-h-[720px] overflow-hidden bg-[#0c122e]">
                <Particles
                    className={cn('[mask-image:radial-gradient1000px_circle_at_center,white,transparent)] ')}
                    particleColors={['#fdfeff', '#06DF72', '#bbbcfa', '#9b8bea']}
                    particleCount={400}
                    particleSpread={9}
                    speed={0.15}
                    rotationMode="reverse"
                    particleBaseSize={200}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
                    <div className="absolute inset-0 backdrop-blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cloud-tint" />
                </div>
            </div>

            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[150px] relative z-10 px-4" data-section-bg="dark">
                <div className="hidden md:block">
                        <LiquidGlass
                            className="group max-w-[759px]"
                            centered={false}
                            compact
                            displacementScale={100}
                            blurAmount={0.01}
                            saturation={100}
                            aberrationIntensity={2}
                            elasticity={0.05}
                            cornerRadius={30}
                            mode="standard"
                            padding="8px 16px"
                            style={{
                                boxShadow: 'none',
                                filter: 'none',
                            }}
                        >
                          <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
 
                             <div className="md:p-10 p-3">
                                 <h1
                                    className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-white"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    Legal AI Benefits <br /> without pain points
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white/80 font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    forget about AI hallucinations
                                </h4>
                            </div>
                          </Tilt3D>
                         </LiquidGlass>
                </div>

                <div className="md:p-10 md:hidden">
                    <h1
                        className="text-[32px]/[110%] md:text-[64px]/[110%] font-normal text-midnight-core mb-[25px]"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        Benefits Deep-Dive Sections
                    </h1>
                    <h4
                        className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        Explore how our tech removes hallucinations and boosts outcomes
                    </h4>
                </div>

                <div className="flex flex-col md:flex-row md:gap-[84px] gap-6 items-start mt-[52px]">
                    <Link
                        className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="https://app.lexrag.com/auth/signup"
                    >
                        Register Free
                    </Link>
                    <Link
                        className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors"
                        href="/services"
                    >
                        {/* <Image
                            className="w-6 h-6"
                            src="/media/technology/video.svg"
                            alt="video"
                            width={24}
                            height={24}
                        /> */}
                        <span className="text-white hover:text-axis-indigo">Explore Services</span>
                    </Link>
                </div>

                <div className="bg-[#8B78E7] rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-center mt-[54px] mb-12 gap-4 md:gap-12">
                    {BADGES.map(({ icon, label, href }) => (
                        <LiquidGlass
                            key={label}
                            className="max-w-[759px] border border-white rounded-3xl transition-colors [&:has(a:hover)]:bg-ion-violet"
                            centered={false}
                            compact
                            displacementScale={0}
                            blurAmount={1}
                            saturation={175}
                            aberrationIntensity={4}
                            elasticity={0.1}
                            cornerRadius={24}
                            mode="standard"
                            padding="8px 16px"
                            style={{ boxShadow: 'none', filter: 'none' }}
                        >
                            <Link href={href} className="flex items-center gap-3">
                                <Image src={icon} width={20} height={20} alt={label} />
                                <span className="text-[14px] font-medium">{label}</span>
                            </Link>
                        </LiquidGlass>
                    ))}
                </div>
            </section>


            <div className="relative z-20 max-w-[1200px] mx-auto pt-16 md:pt-20 px-4 md:px-0" data-section-bg="light">
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
            <SecurityCompliance className="max-w-[1200px] mx-auto mb-[75px] px-4" />
            <Footer />
        </div>
    );
};

export default Benefits;
