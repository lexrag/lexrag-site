"use client";

import CardFlash from "@/components/Layout/CardFlash";

interface InstructionCardProps {
    details: {
        subtitle: string;
        title: string;
        description: string;
        imgSrcLight: string;
        imgSrcDark: string;
        imgClassName: string;
    };
    features: {
        title: string;
        description: string;
    }[];
}

const InstructionCard = ({ details, features }: InstructionCardProps) => {
    if (!details) return null;

    return (
        <CardFlash {...details}>
            <div className="grid md:grid-cols-1 gap-2">
                {features.map((feature, index) => (
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