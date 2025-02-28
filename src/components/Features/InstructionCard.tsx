"use client";

import CardFlash from "@/components/Layout/CardFlash";
import { usePageData } from "@/utils/pageDataLoader";

const InstructionCard = () => {
    const pageData = usePageData();

    if (!pageData?.instructionCardDetails) return null;

    return (
        <CardFlash {...pageData.instructionCardDetails}>
            <div className="grid md:grid-cols-1 gap-2">
                {pageData.instructionCardFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 pe-7.5">
                        <i className="ki-filled ki-check-circle text-base text-success mt-1" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                                {feature.title}
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </CardFlash>
    );
};

export default InstructionCard;