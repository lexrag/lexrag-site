"use client";

import Navigation from "@/components/Layout/PageTitle";
import { Metadata } from "next";
import DeffinitionCard from "@/components/Features/DeffinitionCard";
import InstructionCard from "@/components/Features/InstructionCard";
import FeatureParams from "@/components/Features/FeatureParams";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const toPascalCase = (str: string) => {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

const FeaturePageTemplate = () => {
    const [pageMetadata, setPageMetadata] = useState<Metadata | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const pageName = pathname.split("/").filter(Boolean).pop() || "GraphVisualization";
        const moduleName = toPascalCase(pageName);

        import(`@/components/Features/PageData/${moduleName}`)
            .then((module) => {
                setPageMetadata(module.pageMetadata);
            })
            .catch((error) => {
                console.error("Failed to load page metadata:", error);
            });
    }, [pathname]);

    if (!pageMetadata) return null;

    return (
        <>
            <Navigation />

            <section className="pr-[15%] pl-[15%]">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="flex flex-col gap-5 lg:gap-7.5 col-span-2">
                        <DeffinitionCard />
                        <InstructionCard />
                    </div>

                    <div className="flex flex-col gap-5 lg:gap-7.5">
                        <FeatureParams />
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturePageTemplate;