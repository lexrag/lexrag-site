'use client';

import { usePathname } from 'next/navigation';
import DeffinitionCard from '@/components/Features/DeffinitionCard';
import FeatureParams from '@/components/Features/FeatureParams';
import { combinedFeaturesData, FeatureData } from '@/components/Features/FeaturesData';
import ProductFeatures from '@/components/Features/FeaturesGrid';
import InstructionCard from '@/components/Features/InstructionCard';
import PageTitle from '@/components/Layout/PageTitle';

const FeaturePageTemplate = () => {
    const pathname = usePathname();
    const pageName = pathname.split('/').filter(Boolean).pop() || 'graph-visualization';

    const featureData: FeatureData | undefined = combinedFeaturesData.find((feature) => feature.key === pageName);

    if (!featureData) {
        console.error(`Feature data not found for page: ${pageName}`);
        return null;
    }

    return (
        <>
            <PageTitle />

            <section className="pr-[15%] pl-[15%]">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="flex flex-col gap-5 lg:gap-7.5 col-span-2">
                        <DeffinitionCard details={featureData.deffinitionCardDetails} />
                        <InstructionCard
                            details={featureData.instructionCardDetails}
                            features={featureData.instructionCardFeatures}
                        />
                    </div>

                    <div className="flex flex-col ">
                        <FeatureParams rows={featureData.featureRows} />
                        <div className="">
                            <h2 className="text-xl text-center font-medium mt-10">Browse Relevant Features</h2>
                        </div>
                        <ProductFeatures
                            gridClassName="grid grid-cols-1 mt-4 md:grid-cols-1 gap-5"
                            showDescription={false}
                            showSideBadges={true}
                            showBottomBadges={false}
                            maxHeightBeforeShowAll={500}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturePageTemplate;
