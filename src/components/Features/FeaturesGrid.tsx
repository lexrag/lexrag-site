"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { feats } from "@/components/Features/FeaturesData";
import { getBadgeColor } from "@/utils/badgeColorMapping.";

interface ProductFeaturesProps {
    gridClassName?: string;
    showDescription?: boolean;
    showSideBadges?: boolean;
    showBottomBadges?: boolean;
    maxHeightBeforeShowAll?: number;
}

const ProductFeatures = ({
    gridClassName = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5 lg:pr-[14%] lg:pl-[14%]",
    showDescription = true,
    showSideBadges = true,
    showBottomBadges = true,
    maxHeightBeforeShowAll = 500,
}: ProductFeaturesProps) => {
    const [showAll, setShowAll] = useState(false);
    const pathname = usePathname();

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Convert title to URL-friendly format
    const toUrlFriendly = (title: string) => 
        title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

    const currentPage = pathname.split("/").filter(Boolean).pop() || "";

    // set dynamic colors by feature category
    const categoryColors = {
        search: {
            icon_color: "dark:text-sky-300 light:text-sky-600",
            border: "dark:hover:border-sky-300 light:hover:border-sky-600",
        },
        query: {
            icon_color: "dark:text-lime-300 light:text-lime-600",
            border: "dark:hover:border-lime-300 light:hover:border-lime-600",
        },
        storage: {
            icon_color: "dark:text-amber-300 light:text-amber-600",
            border: "dark:hover:border-amber-300 light:hover:border-amber-600",
        },
        analytics: {
            icon_color: "dark:text-indigo-300 light:text-indigo-600",
            border: "dark:hover:border-indigo-300 light:hover:border-indigo-600",
        },
    };

    // Filter out the current page from the features list
    const visibleFeats = feats.filter(
        (feat) => toUrlFriendly(feat.title) !== currentPage
    );

    return (
        <div className="relative pb-20">
            <div
                className="transition-max-height duration-500 pt-2 ease-in-out overflow-hidden"
                style={{ maxHeight: showAll ? "2000px" : `${maxHeightBeforeShowAll}px` }}
            >
                <div className={gridClassName}>
                    {visibleFeats.map((feat, index) => {
                        const colors = categoryColors[feat.category] || {
                            icon_color: "dark:text-gray-300 light:text-gray-700",
                            border: "dark:border-gray-300 light:border-gray-400",
                        };

                        return (
                            <a
                                key={index}
                                href={feat.link}
                                className="transform transition-transform duration-300 hover:-translate-y-2"
                            >
                                <div
                                    className={`card dark:bg-coal-300 light:bg-white ${colors.border} 
                                        flex flex-col gap-5 p-5 lg:p-6 rounded-xl relative items-center
                                        shadow-md hover:shadow-lg transition-shadow`}
                                >
                                    <div className="flex w-full items-center justify-between gap-4.5">
                                        <div className="flex items-center gap-4.5">
                                            <div className="relative w-[44px] h-[44px] flex items-center justify-center dark:bg-gray-100 light:bg-gray-200 rounded-full">
                                                <i className={`ki-duotone text-2xl ${colors.icon_color} ${feat.icon}`}></i>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-md font-medium ${colors.icon_color} mb-px`}>
                                                    {feat.title}
                                                </span>
                                                <span className="text-2sm dark:text-gray-700 light:text-gray-500">
                                                    {feat.subtitle}
                                                </span>
                                            </div>
                                        </div>

                                        {showSideBadges && (
                                            <div className="flex flex-col items-start gap-3">
                                                <span className={`badge badge-sm badge-outline ${getBadgeColor(feat.category)}`}>
                                                    {feat.category}
                                                </span>

                                                <span
                                                    className={`badge badge-sm badge-outline ${getBadgeColor(feat.plan)}`}
                                                >
                                                    {feat.plan}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {showDescription && (
                                        <p className="text-2sm dark:text-gray-700 light:text-gray-600">
                                            {feat.description}
                                        </p>
                                    )}

                                    {showBottomBadges && (
                                        <div className="flex w-full items-center justify-start gap-3">
                                            <span className={`badge badge-sm badge-outline ${getBadgeColor(feat.category)}`}>
                                                {feat.category}
                                            </span>

                                            <span
                                                className={`badge badge-sm badge-outline ${getBadgeColor(feat.plan)}`}
                                            >
                                                {feat.plan}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {visibleFeats.length > 0 && (
                <div className="text-center mt-8">
                    <button
                        onClick={toggleShowAll}
                        className="btn btn-sm btn-primary transition-all duration-300"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductFeatures;