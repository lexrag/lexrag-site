import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LinkPrimary } from '@/components/ui/link-primary';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Tilt3D from '@/components/tilt3d/Tilt3D';
import BackgroundSVG from '@/components/use-cases/BackgroundSvg';
import Benefits from '@/components/use-cases/Benefits';
import CompareAlternatives from '@/components/use-cases/CompareAlternatives';
import FAQ from '@/components/use-cases/FAQ';
import HowItWorks from '@/components/use-cases/HowItWorks';
// import IntegrationsDeployment from '@/components/use-cases/IntegrationsDeployment';
import LiveExamples from '@/components/use-cases/LiveExample';
import PricingPlans from '@/components/use-cases/PricingPlans';
import TailoredSections from '@/components/use-cases/TailoredSections';
import WhatThisServiceDoes from '@/components/use-cases/WhatThisServiceDoes';
import WhyThisMatter from '@/components/use-cases/WhyThisMatters';

export const metadata: Metadata = {
    title: 'Use Cases - LEXRAG',
    description: 'Discover how LEXRAG can be used in various legal scenarios and applications',
};

const UseCasesPage = () => {
    return (
        <div className="overflow-y-hidden relative">
            <Header className="" />

            <BackgroundSVG
                className="absolute hidden md:flex
                top-20 
                    left-0 
                    w-full 

                    flex-col
                    justify-end 
                    overflow-visible
                    md:overflow-hidden
                    pointer-events-none 
                    -z-10"
            />

            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4 ">
                <div className="hidden md:block">
                    <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                        <LiquidGlass
                            className="group max-w-[892px]"
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
                        >
                            <div className="md:p-10 p-3">
                                <h1
                                    className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-midnight-core"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    Case Review Automation: faster case work without errors
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    For law firms, in-house teams, and academia — built on explainable AI with full
                                    compliance and citations.
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
                        Case Review Automation: faster case work without errors
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
                        <Image
                            className="w-6 h-6"
                            src="/media/technology/video.svg"
                            alt="video"
                            width={24}
                            height={24}
                        />
                        <span className="text-axis-indigo">Watch demo</span>
                    </Link>
                    <Link
                        className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors text-axis-indigo"
                        href="/pricing"
                    >
                        See pricing
                    </Link>
                </div>

                <Benefits className="mt-4 md:mt-[54px] md:mb-[74px] mb-[24px]" />
            </section>

            <WhyThisMatter className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <HowItWorks className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <WhatThisServiceDoes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <LiveExamples className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <TailoredSections className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <CompareAlternatives className="max-w-[1200px] px-4 mx-auto mb-[75px] md:mb-[75px] md-[36px]" />
            {/* <IntegrationsDeployment className="max-w-[1200px] px-4 mx-auto mb-[75px]" /> */}
            <PricingPlans className="max-w-[1200px] px-4 mx-auto md:mb-[75px] md-[36px]" />
            <FAQ className="max-w-[1200px] px-4 mx-auto mb-[75px] md:mb-[75px] md-[36px]" />

            <div className="hidden mb-[75px] md:flex justify-center gap-[84px]">
                <LinkPrimary href="/use-cases">See demo</LinkPrimary>
                <LinkPrimary href="/use-cases">Start free</LinkPrimary>
                <LinkPrimary variant="outline" href="/use-cases">
                    See pricing
                </LinkPrimary>
            </div>

            <Footer />
        </div>
    );
};

export default UseCasesPage;
