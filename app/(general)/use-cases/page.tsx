import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Tilt3D from '@/components/tilt3d/Tilt3D';
import Benefits from '@/components/use-cases/Benefits';
import HowItWorks from '@/components/use-cases/HowItWorks';
// import IntegrationsDeployment from '@/components/use-cases/IntegrationsDeployment';
import LiveExamples from '@/components/use-cases/LiveExample';
import TailoredSections from '@/components/use-cases/TailoredSections';
import WhatThisServiceDoes from '@/components/use-cases/WhatThisServiceDoes';
import WhyThisMatter from '@/components/use-cases/WhyThisMatters';
import Particles from '@/components/Particles/Particles';
import { cn } from '@/lib/utils';
import SecurityCompliance from '@/components/technology/SecurityCompliance';

export const metadata: Metadata = {
    title: 'Use Cases',
    description: 'Discover how LEXRAG can be used in various legal scenarios and applications',
};

const UseCasesPage = () => {
    return (
        <div className="overflow-y-hidden">
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


            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4 " data-section-bg="dark">
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
                                    AI Case Review: <br />
                                    faster & with no errors
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white/80 font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    for law firms, in-house & academia
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
                        Case Review Automation: faster litigation with no errors
                    </h1>
                    <h4
                        className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        For law firms, in-house teams, and academia — built on explainable AI with full compliance and
                        citations.
                    </h4>
                </div>

                <div className="flex md:flex-row md:gap-[84px] gap-6 items-start mt-16 md:mt-[52px] flex-wrap md:flex-nowrap">
                    <Link
                        className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="/technology"
                    >
                        See the Tech in Action
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
                    {/* <Link
                        className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors text-axis-indigo"
                        href="/pricing"
                    >
                        See pricing
                    </Link> */}
                </div>

                <Benefits className="mt-4 md:mt-[54px] md:mb-[74px] mb-[24px]" />
            </section>

            <WhyThisMatter className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <HowItWorks className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <WhatThisServiceDoes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <LiveExamples className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <TailoredSections className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            {/* <CompareAlternatives className="max-w-[1200px] px-4 mx-auto mb-[75px] md:mb-[75px] md-[36px]" /> */}
            {/* <IntegrationsDeployment className="max-w-[1200px] px-4 mx-auto mb-[75px]" /> */}
            {/* <PricingPlans className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" /> */}
            {/* <FAQ className="max-w-[1200px] px-4 mx-auto mb-[75px] md:mb-[75px] md-[36px]" /> */}

             <SecurityCompliance className="max-w-[1200px] mx-auto mb-[75px] px-4" />
            <Footer />
        </div>
    );
};

export default UseCasesPage;
