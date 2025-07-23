import { Metadata } from 'next';
import ProductFeatures from '@/components/Features/FeaturesGrid';

export const metadata: Metadata = {
    title: 'Lexrag | Product Features',
    //TODO: add description
};

const Features = () => {
    return (
        <section>
            <ProductFeatures
                gridClassName="grid grid-cols-1 lg:px-12 pb-2 md:grid-cols-4 gap-4 min-h-[230px]"
                showDescription={true}
                showSideBadges={false}
                showBottomBadges={true}
                maxHeightBeforeShowAll={600}
            />
        </section>
    );
};

export default Features;
