import { Metadata } from 'next';
import ProductFeatures from '@/components/Features/FeaturesGrid';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import PageTitle from '@/components/Layout/PageTitle';

export const metadata: Metadata = {
    title: 'Features - LEXRAG',
    description: 'Explore legal data like never before — through graphs, vectors, and intelligent query breakdowns',
};

const FeaturesPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="Product Features" finalTitle="Features" />

                <section id="product-features" className="pb-20">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-4xl pt-28 mb-2 font-semibold transition-colors duration-300 text-gray-900 dark:text-white">
                            Product Features
                        </h3>
                        <p className="font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            Explore legal data like never before — through graphs, vectors, and intelligent query
                            breakdowns
                        </p>
                    </div>
                    <ProductFeatures
                        gridClassName="grid grid-cols-1 md:grid-cols-4 lg:pr-[14%] lg:pl-[14%] gap-4 min-h-[230px]"
                        showDescription={true}
                        showSideBadges={false}
                        showBottomBadges={true}
                        maxHeightBeforeShowAll={500}
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FeaturesPage;
