import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Quotation from '@/components/quotation/Quotation';
import ExploreAllServices from '@/components/services/ExploreAllServices';
import HowItWorks from '@/components/services/HowItWorks';
import HowItWorksWrapper from '@/components/services/HowItWorksWrapper';
// import Intergrations from '@/components/services/Integrations';
import Outcomes from '@/components/services/Outcomes';
import WhatTheServiceDoes from '@/components/services/WhatTheServiceDoes';
import Tilt3D from '@/components/tilt3d/Tilt3D';

export const metadata: Metadata = {
    title: 'Services - LEXRAG',
    description: 'Comprehensive legal data analysis and research services powered by GraphRAG technology',
};

type Badge = {
    icon: string;
    label: string;
    href: string;
};

const BADGES: Badge[] = [
    { icon: '/media/technology/explainable.svg', label: 'Explainable AI', href: '/technology' },
    { icon: '/media/technology/search.svg', label: 'Source-traceable', href: '/technology' },
    { icon: '/media/technology/vendor.svg', label: 'No Vendor Lock-in', href: '/technology' },
    { icon: '/media/technology/acp.svg', label: 'API/MCP-ready', href: '/technology' },
];

const ServicesPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />
            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4">
                <div className="hidden md:block">
                    <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                        <LiquidGlass
                            className="group max-w-[801px]"
                            centered={false}
                            compact
                            displacementScale={0}
                            blurAmount={0.01}
                            saturation={200}
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
                            <div className="md:p-10 p-3">
                                <h1
                                    className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-midnight-core"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    Instant Legal Research Trusted Sources
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    AI reasoning you can verify
                                </h4>
                            </div>
                        </LiquidGlass>
                    </Tilt3D>
                </div>

                <div className="md:p-10 md:hidden">
                    <h1
                        className="text-[32px]/[110%] md:text-[64px]/[110%] font-normal text-midnight-core mb-[25px]"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        Legal Research in Seconds — with Trusted Sources
                    </h1>
                    <h4
                        className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        Transparent AI reasoning with citations you can trace and verify.
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
                        <Image
                            className="w-6 h-6"
                            src="/media/technology/video.svg"
                            alt="video"
                            width={24}
                            height={24}
                        />
                        <span className="text-axis-indigo">Watch demo</span>
                    </Link>
                </div>
                <div className="bg-static-lilac rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-center mt-[54px] mb-12 gap-4 md:gap-20">
                    {BADGES.map(({ icon, label, href }) => (
                        <LiquidGlass
                            key={label}
                            className="group max-w-[759px] border border-white rounded-3xl"
                            centered={false}
                            compact
                            displacementScale={0}
                            blurAmount={1}
                            saturation={250}
                            aberrationIntensity={4}
                            elasticity={0.05}
                            cornerRadius={24}
                            mode="standard"
                            padding="8px 16px"
                            style={{ boxShadow: 'none', filter: 'none' }}
                        >
                            <Link href={href} className="hover:opacity-75 transition-opacity flex items-center gap-2">
                                <Image src={icon} width={20} height={20} alt={label} />
                                <span className="text-[14px] font-medium">{label}</span>
                            </Link>
                        </LiquidGlass>
                    ))}
                </div>
            </section>

            <WhatTheServiceDoes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <HowItWorks className="lg:hidden max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" />
            <HowItWorksWrapper className="hidden lg:block" />
            <Outcomes className="max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" />
            {/* <Intergrations className="max-w-[1200px] px-4 mx-auto mb-[75px]" /> */}
            <ExploreAllServices className="max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" />
            <Quotation className="max-w-[1200px] mx-auto mb-[145px] " />
            <Footer />
        </div>
    );
};

export default ServicesPage;
