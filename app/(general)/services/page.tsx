import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import HowItWorks from '@/components/services/HowItWorks';
import Intergrations from '@/components/services/Integrations';
import Outcomes from '@/components/services/Outcomes';
import WhatTheServiceDoes from '@/components/services/WhatTheServiceDoes';
import Tilt3D from '@/components/tilt3d/Tilt3D';

export const metadata: Metadata = {
    title: 'Services - LEXRAG',
    description: 'Comprehensive legal data analysis and research services powered by GraphRAG technology',
};

const ServicesPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />
            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4">
                <div className="hidden md:block">
                    <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                        <LiquidGlass
                            className="group max-w-[900px]"
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

                <div className="flex flex-col md:flex-row md:gap-[84px] gap-6 items-start mt-68 md:mt-[52px]">
                    <Link
                        className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="/services"
                    >
                        Book Demo
                    </Link>
                    <Link
                        className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="/services"
                    >
                        Start Free
                    </Link>
                    <Link
                        className="text-axis-indigo border border-phase-green hover:bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="/pricing"
                    >
                        See pricing
                    </Link>
                </div>

                <div className="bg-axis-indigo rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-around mt-[54px] mb-[75px]">
                    <Link href="/services" className="hover:opacity-75 transition-opacity">
                        #Legal Accuracy
                    </Link>
                    <Link href="/services" className="hover:opacity-75 transition-opacity">
                        #Explainable AI
                    </Link>
                    <Link href="/services" className="hover:opacity-75 transition-opacity">
                        #Case Assessment
                    </Link>
                    <Link href="/services" className="hover:opacity-75 transition-opacity">
                        #Neighbor Services
                    </Link>
                </div>
            </section>

            <Image
                className="absolute right-0 top-64 md:top-12 md:w-[707px] md:h-[421px] w-[400px] h-[250px]"
                src={'/media/service/service-hero-bg.svg'}
                alt="image"
                width={707}
                height={421}
            />

            <WhatTheServiceDoes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <HowItWorks className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <Outcomes className="max-w-[1200px] px-4 mx-auto mb-[75px]" />
            <Intergrations className="max-w-[1200px] px-4 mx-auto mb-[75px]" />

            <Footer />
        </div>
    );
};

export default ServicesPage;
