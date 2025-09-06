import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LinkPrimary } from '@/components/ui/link-primary';
import CustomerMap from '@/components/about/CustomerMap';
import OurValues from '@/components/about/OurValues';
import { RoadMap } from '@/components/about/RoadMap';
import WhoWeAre from '@/components/about/WhoWeAre';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Tilt3D from '@/components/tilt3d/Tilt3D';

export const metadata: Metadata = {
    title: 'About',
};

type Badge = {
    icon: string;
    label: string;
    href: string;
};

const BADGES: Badge[] = [
    { icon: '/media/technology/explainable.svg', label: 'Explainable & Source-Traceable', href: '/technology' },
    { icon: '/media/technology/no-ai.svg', label: 'No AI Hallucinations', href: '/technology' },
    { icon: '/media/technology/vendor.svg', label: 'Interoperable with Any LLM', href: '/technology' },
    { icon: '/media/technology/acp.svg', label: 'API/MCP-ready', href: '/technology' },
];

const About = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4">
                <div className="hidden md:block">
                    <Tilt3D className="group block" maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                        <LiquidGlass
                            className="group max-w-[759px]"
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
                                    Trustworthy AI for Legal Professionals
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    сlear, defensible tools for lawyers
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
                        Trustworthy AI for Legal Professionals
                    </h1>
                    <h4
                        className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core font-normal"
                        style={{
                            fontFamily: 'Instrument Sans',
                        }}
                    >
                        clear, defensible tools for lawyers
                    </h4>
                </div>

                <div className="flex flex-col md:flex-row md:gap-[84px] gap-6 items-start mt-[52px]">
                    <LinkPrimary href="/services">Services</LinkPrimary>
                    <LinkPrimary href="/technology">Technology</LinkPrimary>
                    <LinkPrimary variant="outline" href="https://app.lexrag.com/auth/signup">
                        {' '}
                        Register Free
                    </LinkPrimary>
                </div>
                <div className="bg-static-lilac rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-center mt-[54px] mb-12 gap-4 md:gap-12">
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

            <WhoWeAre className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />
            <OurValues className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />

            <div className="flex-grow">
                <h2 className="mb-28 text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4 mt-40">
                    Roadmap & Vision
                </h2>

                <div className="mb-10">
                    <RoadMap />
                </div>
            </div>

            <CustomerMap className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />

            <Footer />
        </div>
    );
};

export default About;
