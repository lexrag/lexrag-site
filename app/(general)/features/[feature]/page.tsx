import type { Metadata } from 'next';
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

export default async function FeatureDetailPage({ params }: { params: Promise<{ feature: string }> }) {
    const { feature } = await params;
    const data = combinedFeaturesData.find((f) => f.key === feature);
    if (!data) return notFound();

    return (
        <div className="overflow-y-auto">
            <Header className="" />
            <main className="pt-12">
                <section className="pb-20">
                    <FeaturePageTemplate feature={data} />
                </section>
            </main>
            <Footer />
        </div>
    );
}
