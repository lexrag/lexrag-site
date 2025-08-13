'use client';

import DeffinitionCard from '@/components/Features/DeffinitionCard';
import FeatureParams from '@/components/Features/FeatureParams';
import { FeatureData } from '@/components/Features/FeaturesData';
import ProductFeatures from '@/components/Features/FeaturesGrid';
import InstructionCard from '@/components/Features/InstructionCard';

type Props = { feature: FeatureData };

const FeaturePageTemplate = ({ feature }: Props) => {
    return (
        <section className="lg:pt-48 pt-32 px-4">
            <h2 className="lg:mb-20 mb-12 text-midnight-core text-4xl lg:text-6xl">Dossier Compilation</h2>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                <div className="flex flex-col gap-5 lg:gap-7.5 col-span-2">
                    <DeffinitionCard details={feature.deffinitionCardDetails} />
                    <InstructionCard
                        details={feature.instructionCardDetails}
                        features={feature.instructionCardFeatures}
                    />
                </div>

                <div className="flex flex-col">
                    <FeatureParams rows={feature.featureRows} />
                    <div>
                        <h2 className="text-xl text-center font-medium mt-10 text-midnight-core">
                            Browse Relevant Features
                        </h2>
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
    );
};

export default FeaturePageTemplate;
