"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import CardTable from "@/components/Layout/CardTable";
import CardTableRow from "@/components/Layout/CardTableRow";

const FeatureParams = () => {
    const [mappedFeatureRows, setMappedFeatureRows] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const pageName = pathname.split("/").filter(Boolean).pop() || "GraphVisualization";

        const toPascalCase = (str: string) =>
            str
                .toLowerCase()
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("");

        const pascalCasePageName = toPascalCase(pageName);

        console.log(`Importing module from: /components/Features/PageData/${pascalCasePageName}.tsx`);

        import(`@/components/Features/PageData/${pascalCasePageName}.tsx`)
            .then((module) => {
                setMappedFeatureRows(module.mappedFeatureRows || []);
            })
            .catch((error) => {
                console.error("Failed to load page data:", error);
            });
    }, [pathname]);

    if (!mappedFeatureRows || mappedFeatureRows.length === 0) return null;

    return (
        <CardTable title="Feature Parameters">
            {mappedFeatureRows.map((row, index) => (
                <CardTableRow 
                    key={index}
                    icon={row.icon}
                    label={row.label}
                    badge={row.badge}
                    badgeColor={row.badgeColor}
                />
            ))}
        </CardTable>
    );
};

export default FeatureParams;