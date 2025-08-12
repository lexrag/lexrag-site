import { Metadata } from 'next';
import FeaturePageTemplate from '@/components/Features/FeaturePageTemplate';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import PageTitle from '@/components/Layout/PageTitle';

export const dynamic = 'force-static';
export const dynamicParams = false;

export const metadata: Metadata = {
    title: 'Feature Details - LEXRAG',
    description: 'Detailed information about LEXRAG features and capabilities',
};
export async function generateStaticParams() {
    return combinedFeaturesData.map((feature) => ({
        feature: feature.key,
    }));
}

const FeatureDetailPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="Feature Details" finalTitle="Features" />

                <section className="pb-20">
                    <FeaturePageTemplate />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FeatureDetailPage;
