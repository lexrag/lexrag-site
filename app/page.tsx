import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import HeroSlider from '@/components/Landing/HeroSlider';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';

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
    { icon: '/media/technology/explainable.svg', label: 'Explainable & Source-Traceable', href: '/home' },
    { icon: '/media/technology/search.svg', label: 'No AI Hallucinations', href: '/home' },
    { icon: '/media/technology/vendor.svg', label: 'Interoperable with Any LLM', href: '/home' },
    { icon: '/media/technology/acp.svg', label: 'API/MCP-ready', href: '/home' },
];

const HomePage = () => {
    return (
        <div className="overflow-x-hidden flex-1 relative">
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
            </div>

            <div className="pt-20 md:pt-[120px] relative">
                <HeroSlider />
                <div className="max-w-[1200px] mx-auto  relative z-10 px-4">
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
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19.5202 17.1001L16.7402 15.1501V8.84013L19.5202 6.89013C20.8802 5.94013 22.0002 6.52013 22.0002 8.19013V15.8101C22.0002 17.4801 20.8802 18.0601 19.5202 17.1001Z"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="text-white">Watch demo</span>
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

                <div className="h-[160px] absolute bg-gradient-to-t from-cloud-tint to-transparent bottom-16 -translate-y-2 right-0 left-0"></div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-[75px] bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF99] border border-white p-10 flex justify-center rounded-3xl mb-[1000px]">
                <p className="max-w-[960px] text-axis-indigo text-[54px]/[110%]">
                    Verifiable answers for legal research, document review and case assessment.
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
