"use client";

import Navigation from "@/components/Layout/PageTitle";
import { Metadata } from "next";
import DeffinitionCard from "@/components/Features/DeffinitionCard";
import InstructionCard from "@/components/Features/InstructionCard";
import FeatureParams from "@/components/Features/FeatureParams";
import { usePathname } from "next/navigation";
import ProductFeatures from "@/components/Features/FeaturesGrid";
import { combinedFeaturesData, FeatureData } from "@/components/Features/FeaturesData";

const FeaturePageTemplate = () => {
    const pathname = usePathname();
    const pageName = pathname.split("/").filter(Boolean).pop() || "graph-visualization";

    // Поиск данных о фиче напрямую из combinedFeaturesData
    const featureData: FeatureData | undefined = combinedFeaturesData.find(
        (feature) => feature.key === pageName
    );

    if (!featureData) {
        console.error(`Feature data not found for page: ${pageName}`);
        return null;
    }

    return (
        <>
            <Navigation />

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
                            <h2 className="text-1.5xl text-center font-medium text-gray-900 mt-5">
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
        </>
    );
};

export default FeaturePageTemplate;