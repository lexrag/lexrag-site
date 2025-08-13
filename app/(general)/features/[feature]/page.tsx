import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FeaturePageTemplate from '@/components/Features/FeaturePageTemplate';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';

export const dynamic = 'force-static';
export const dynamicParams = false;

export const metadata: Metadata = {
    title: 'Feature Details - LEXRAG',
    description: 'Detailed information about LEXRAG features and capabilities',
};

export async function generateStaticParams() {
    return combinedFeaturesData.map((feature) => ({ feature: feature.key }));
}

export default function FeatureDetailPage({ params }: { params: { feature: string } }) {
    const feature = combinedFeaturesData.find((f) => f.key === params.feature);
    if (!feature) return notFound();

    return (
        <div className="overflow-y-auto">
            <Header className="" />
            <main className="pt-12">
                <section className="pb-20">
                    <FeaturePageTemplate feature={feature} />
                </section>
            </main>
            <Footer />
        </div>
    );
}
