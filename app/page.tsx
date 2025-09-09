import { Metadata } from 'next';
// import { H3 } from '@/components/ui/typography';
// import ProductFeatures from '@/components/Features/FeaturesGrid';
// import Header from '@/components/Header/Header';
// import Benefits from '@/components/Landing/Benefits';
// import Footer from '@/components/Landing/Footer';
// import Hero from '@/components/Landing/Hero';
// import UseCases from '@/components/Landing/UseCases';
import '@/css/themes/reui.css';
import Link from 'next/link';
import { Timer } from '@/components/ui/timer';
import LiquidGlass from '@/components/liquid-glass';
import Particles from '@/components/Particles/Particles';
import { cn } from '@/lib/utils';

// import BackgroundSVG from '@/components/Landing/BackgroundSVG';

export const metadata: Metadata = {
    title: 'LEXRAG',
};

const LandingPage = () => {
    return (
        <div className="overflow-hidden bg-[#131319] flex-grow-1 relative min-h-screen">
            {/* <Header className="" /> */}

            <main className="px-[10%] z-1 relative text-center">
                <div className="max-w-[800px]  mx-auto mt-40 border border-white overflow-hidden rounded-[88px]">
                    <LiquidGlass
                        className="group transition-all duration-200 w-full h-full"
                        centered={false}
                        compact
                        displacementScale={50}
                        blurAmount={0.01}
                        saturation={130}
                        aberrationIntensity={2}
                        elasticity={0.05}
                        cornerRadius={80}
                        mode="standard"
                        padding="8px 16px"
                        style={{
                            boxShadow: 'none',
                            filter: 'none',
                        }}
                    >
                        <div className="p-8 md:py-16">
                            <h1 className="text-2xl md:text-7xl font-extrabold text-white uppercase">Coming soon</h1>
                            <h5 className="pl-2 mt-1 text-sm md:text-2xl font-bold text-white">
                                Our website is under construction
                            </h5>

                            <div className="flex justify-center mt-8">
                                <Timer />
                            </div>

                            <Link
                                href="#"
                                className="text-sm md:text-xl mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-extrabold text-white border border-white text-center hover:opacity-90"
                            >
                                Follow us for updates!
                            </Link>
                        </div>
                    </LiquidGlass>
                </div>

                {/* <BackgroundSVG /> */}
                {/* <section>
                    <Hero />
                </section> */}

                {/* <section id="benefits" className="pl-6">
                    <Benefits />
                </section>

                <section id="how-it-works" className="">
                    <UseCases />
                </section> */}

                {/* <section id="product-features" className="">
                    <div className="mb-10">
                        <H3 className="mb-2 transition-colors duration-300 text-[var(--color-midnight-core)] pl-8">
                            Product Features
                        </H3>
                    </div>
                    <ProductFeatures
                        gridClassName="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[230px]"
                        showDescription={true}
                        showSideBadges={false}
                        showBottomBadges={true}
                        maxHeightBeforeShowAll={650}
                    />
                </section> */}
            </main>

            <Particles
                        className={cn(
                            'absolute inset-0',
                            '[mask-image:radial-gradient1000px_circle_at_center,white,transparent)]',
                        )}
                        particleColors={["#fdfeff", "#06DF72","#bbbcfa", "#9b8bea"]}
                        particleCount={400}
                        particleSpread={9}                        
                        speed={0.11}
                        rotationMode="reverse"
                        particleBaseSize={200}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                    />

            {/* <Footer /> */}
        </div>
    );
};

export default LandingPage;
