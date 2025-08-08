import { Metadata } from 'next';
import ProductFeatures from '@/components/Features/FeaturesGrid';
import Header from '@/components/Header/Header';
import Benefits from '@/components/Landing/Benefits';
import Footer from '@/components/Landing/Footer';
import Hero from '@/components/Landing/Hero';
import UseCases from '@/components/Landing/UseCases';
import { H3, PBase } from '@/components/ui/typography';

export const metadata: Metadata = {
    title: 'LEXRAG',
};

const LandingPage = () => {
    return (
        <div className="overflow-y-auto bg-gradient-to-br from-[#D4D8E6] via-[#EBF0FF] to-[#D4D8E6] min-h-screen">
            <Header className="" />

            <main className="">
                <section>
                    <Hero />
                </section>

                <section id="benefits" className="pr-[10%] pl-[10%]">
                    <Benefits />
                </section>

                <section id="how-it-works" className="">
                    <UseCases />
                </section>

                <section id="product-features" className="">
                    {/* TODO: keep sections title separately for reuse */}
                    <div className="text-center mb-10">
                        <H3 className="pt-28 mb-2 transition-colors duration-300 text-gray-900 dark:text-white">
                            Product Features
                        </H3>
                        <PBase className="font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            Explore legal data like never before — through graphs, vectors, and intelligent query
                            breakdowns
                        </PBase>
                    </div>
                    <ProductFeatures
                        gridClassName="grid grid-cols-1 md:grid-cols-4 lg:pr-[14%] lg:pl-[14%] gap-4 min-h-[230px]"
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
