import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import WhoWeAre from '@/components/about/WhoWeAre';
import Header from '@/components/Header/Header';
import Benefits from '@/components/home/Benefits';
import ServicesOverview from '@/components/home/ServicesOverview';
import TheEngine from '@/components/home/TheEngine';
import VariableProximityText from '@/components/home/VariableProximityText';
import Footer from '@/components/Landing/Footer';
import HeroSlider from '@/components/Landing/HeroSlider';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
import SecurityCompliance from '@/components/technology/SecurityCompliance';

export const metadata: Metadata = {
    title: 'Home - LEXRAG',
    description: 'Verifiable answers for legal research, document review and case assessment.',
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

const HomePage = () => {
    return (
        <div className="overflow-y-hidden">
            <Header className="" />

            <div className="pointer-events-none absolute left-0 right-0 top-0 h-[720px] overflow-hidden bg-[#0c122e] z-0">
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

            
            <div className="pt-20 md:pt-[70px] relative z-10" data-section-bg="dark">
                <HeroSlider />
                <div className="max-w-[1200px] mx-auto  relative z-10 px-4">
                    <div className="flex flex-col md:flex-row md:gap-[70px] gap-6 items-start mt-20 md:mt-10">
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

                            <span className="text-white hover:text-axis-indigo">Explore Services</span>
                        </Link>
                    </div>
                    <div className="bg-[#8B78E7] rounded-3xl md:rounded-full py-[18px] flex flex-wrap items-center justify-center mt-[72px] mb-12 gap-3 md:gap-8">
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
                </div>

                
            </div>
            <div data-section-bg="light">
                <VariableProximityText />
            </div>
            <div data-section-bg="light">
                <TheEngine className="max-w-[1200px] mx-auto px-4 mb-8 md:mb-[75px]" />
            </div>
            <div data-section-bg="light">
                <ServicesOverview className="max-w-[1200px] mx-auto px-4 mb-8 md:mb-[75px]" />
            </div>
            <div data-section-bg="light">
                <Benefits />
            </div>
            <div data-section-bg="light">
                <WhoWeAre className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" isExpanded={false} />
            </div>
            <div data-section-bg="light">
                <SecurityCompliance className="max-w-[1200px] mx-auto px-4 md:mb-[75px] mb-8" />
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
