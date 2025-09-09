import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LinkPrimary } from '@/components/ui/link-primary';
import { cn } from '@/lib/utils';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
import HowItWorks from '@/components/technology/HowItWorks';
import IntegrationOptions from '@/components/technology/IntegrationOptions';
import SecurityCompliance from '@/components/technology/SecurityCompliance';
import WhatIs from '@/components/technology/WhatIs';
import TheEngine from '@/components/home/TheEngine';
import WhyItsBetter from '@/components/technology/WhyItsBetter';
import Tilt3D from '@/components/tilt3d/Tilt3D';

export const metadata: Metadata = {
    title: 'Technology - LEXRAG',
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

const Technology = () => {
    return (
        <div className="overflow-y-hidden">
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
                    moveParticlesOnHover={true}
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
                                    Verifiable Answers Authoritative Sources
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white/80 font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    powered by graph + vector + RAG
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
                        Verifiable Answers Authoritative Sources
                    </h1>
                    <h4
                        className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        powered by graph + vector + RAG
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

            <WhatIs className="max-w-[1200px] mx-auto px-4" />
            <div data-section-bg="light">
                <TheEngine className="max-w-[1200px] mx-auto px-4 mb-8 md:mb-[75px]" />
            </div>
            <WhyItsBetter className="max-w-[1200px] mx-auto  mb-20 md:mb-[128px] px-4" />
            <IntegrationOptions className="max-w-[1200px] mx-auto mb-20 md:mb-[75px] px-4" />
            <SecurityCompliance className="max-w-[1200px] mx-auto mb-[75px] px-4" />

            <div className="max-w-[1200px] mx-auto mb-[145px] px-4">
                <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                    <LiquidGlass
                        className="group max-w-[600px]"
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
                            <h4
                                className="text-[20px]/[21px] md:text-[32px]/[120%] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                                style={{
                                    fontFamily: 'Instrument Sans',
                                }}
                            >
                                “Confidence in technology grows through experience: by testing, integrating, and relying
                                on it, you discover that security and usability go hand in hand.”
                            </h4>
                            <p className="text-midnight-core mt-5 text-sm md:text-base">A. Author</p>
                        </div>
                    </LiquidGlass>
                </Tilt3D>

                <div className="mt-13">
                    <LinkPrimary href="/technology">Get started</LinkPrimary>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Technology;
