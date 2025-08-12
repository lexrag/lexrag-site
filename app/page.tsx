import { Metadata } from 'next';
import { H3 } from '@/components/ui/typography';
import ProductFeatures from '@/components/Features/FeaturesGrid';
import Header from '@/components/Header/Header';
import Benefits from '@/components/Landing/Benefits';
import Footer from '@/components/Landing/Footer';
import Hero from '@/components/Landing/Hero';
import UseCases from '@/components/Landing/UseCases';
import '@/components/ui/css-variables.css';
import BackgroundSVG from '@/components/Landing/BackgroundSVG';

export const metadata: Metadata = {
    title: 'LEXRAG',
};

const LandingPage = () => {
    return (
        <div className="overflow-y-auto bg-gradient-to-br from-[#D4D8E6] via-[#EBF0FF] to-[#D4D8E6] min-h-screen">
            <Header className="px-[10%]" />

            <main className="px-[10%] z-1 relative">
                <BackgroundSVG />
                <section>
                    <Hero />
                </section>

                <section id="benefits" className="pl-6">
                    <Benefits />
                </section>

                <section id="how-it-works" className="">
                    <UseCases />
                </section>

                <section id="product-features" className="">
                    {/* TODO: keep sections title separately for reuse */}
                    <div className="mb-10">
                        <H3 className="mb-2 transition-colors duration-300 text-[var(--Brand-Primary-Midnight-Core)] pl-8">
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
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
