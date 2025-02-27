"use client";

import { useState } from "react";
import { feats } from "@/components/Features/FeaturesData";

const ProductFeatures = () => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

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

    const visibleFeats = feats;

    return (
        <div className="relative pb-20">
            <div
                className={`transition-max-height duration-500 pt-2 ease-in-out overflow-hidden ${
                    showAll ? "max-h-[2000px]" : "max-h-[500px]"
                }`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5 lg:pr-[14%] lg:pl-[14%]">
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
                                        flex flex-col gap-5 p-5 lg:p-7.5 rounded-xl relative items-center
                                        shadow-md hover:shadow-lg transition-shadow`}
                                >
                                    <div className="flex w-full items-center justify-start  gap-2.5">
                                        <div className="relative w-[44px] h-[44px] flex items-center justify-center 
                                            dark:bg-gray-100 light:bg-gray-200 rounded-full">
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

                                    <p className="text-2sm dark:text-gray-700 light:text-gray-600">
                                        {feat.description}
                                    </p>

                                    <div className="flex w-full items-center justify-start gap-3">
                                        {/* <p className="text-2sm dark:text-gray-700 light:text-gray-600">category:</p> */}
                                        <span className="badge badge-sm badge-outline badge-secondary">
                                            {feat.category}
                                        </span>

                                        {/* <p className="text-2sm dark:text-gray-700 light:text-gray-600">plan:</p> */}
                                        <span
                                            className={`badge badge-sm badge-outline ${
                                                {
                                                    freemium: "badge-dark",
                                                    basic: "badge-success",
                                                    advanced: "badge-warning",
                                                    premium: "badge-info",
                                                }[feat.plan] || "badge-secondary"
                                            }`}
                                        >
                                            {feat.plan}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={toggleShowAll}
                    className="btn btn-sm btn-primary transition-all duration-300"
                >
                    {showAll ? "Show Less" : "Show All"}
                </button>
            </div>
        </div>
    );
};

export default ProductFeatures;