"use client";

import { usePageData } from "@/utils/pageDataLoader";
import CardTable from "@/components/Layout/CardTable";
import CardTableRow from "@/components/Layout/CardTableRow";

const FeatureParams = () => {
    const pageData = usePageData();

    if (!pageData?.mappedFeatureRows || pageData.mappedFeatureRows.length === 0) return null;

    return (
        <CardTable title="Feature Parameters">
            {pageData.mappedFeatureRows.map((row, index) => (
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