import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
import HowItWorks from '@/components/services/HowItWorks';
import HowItWorksWrapper from '@/components/services/HowItWorksWrapper';
// import Intergrations from '@/components/services/Integrations';
import Outcomes from '@/components/services/Outcomes';
import WhatTheServiceDoes from '@/components/services/WhatTheServiceDoes';
import Tilt3D from '@/components/tilt3d/Tilt3D';

export const metadata: Metadata = {
    title: 'Services',
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
                                    Legal Research Trusted Sources
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white/80 font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    AI reasoning you can verify
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
                        href="/technology"
                    >
                        {/* <Image
                            className="w-6 h-6"
                            src="/media/technology/video.svg"
                            alt="video"
                            width={24}
                            height={24}
                        /> */}
                        <span className="text-white hover:text-axis-indigo">Explore Technology</span>
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

            <WhatTheServiceDoes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <HowItWorks className="lg:hidden max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" />
            <HowItWorksWrapper className="hidden lg:block" />
            <Outcomes className="max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" />
            {/* <Intergrations className="max-w-[1200px] px-4 mx-auto mb-[75px]" /> */}
            {/* <ExploreAllServices className="max-w-[1200px] px-4 mx-auto md:mb-[75px] mb-8" /> */}
            {/* <Quotation className="max-w-[1200px] mx-auto mb-[145px] " /> */}
            <Footer />
        </div>
    );
};

export default ServicesPage;
