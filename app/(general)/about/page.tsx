import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LinkPrimary } from '@/components/ui/link-primary';
import CustomerMap from '@/components/about/CustomerMap';
import OurValues from '@/components/about/OurValues';
import { RoadMap } from '@/components/about/RoadMap';
import WhoWeAre from '@/components/about/WhoWeAre';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
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
                    <Tilt3D maxTilt={10} perspective={1100} scale={1.03} radius={24}>
                        <LiquidGlass
                            className="group max-w-[759px] border border-white/15 rounded-[44px] overflow-hidden"
                            centered={false}
                            compact
                            displacementScale={100}
                            blurAmount={0.01}
                            saturation={100}
                            aberrationIntensity={2}
                            elasticity={0.05}
                            cornerRadius={30}
                            mode="prominent"
                            padding="8px 16px"
                            style={{
                                boxShadow: 'none',
                                filter: 'none',
                            }}
                        >
                            <div className="md:p-10 p-3">
                                <h1
                                    className="text-[24px]/[110%] md:text-[64px]/[110%] font-normal text-white"
                                    style={{
                                        fontFamily: 'Instrument Sans',
                                    }}
                                >
                                    Trustworthy AI for Legal Professionals
                                </h1>
                                <h4
                                    className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-white/80 font-normal"
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
                    <LinkPrimary className="text-white" variant="outline" href="https://app.lexrag.com/auth/signup">
                        {' '}
                        Register Free
                    </LinkPrimary>
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

            <div data-section-bg="light">
                <WhoWeAre className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" isExpanded={true} />
            </div>
            <div data-section-bg="light">
                <OurValues className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />
            </div>

            <div className="flex-grow" data-section-bg="light">
                <h2 className="mb-28 text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4 mt-40">
                    Roadmap & Vision
                </h2>

                <div className="mb-10">
                    <RoadMap />
                </div>
            </div>

            <div data-section-bg="light">
                <CustomerMap className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />
            </div>

            <Footer />
        </div>
    );
};

export default About;
