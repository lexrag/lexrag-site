"use client";

import CardTable from "@/components/Layout/CardTable";
import CardTableRow from "@/components/Layout/CardTableRow";

interface FeatureParamsProps {
    rows: {
        icon: string;
        label: string;
        badge: string;
        badgeColor: string;
    }[];
}

const FeatureParams = ({ rows }: FeatureParamsProps) => {
    if (!rows || rows.length === 0) return null;

    return (
        <CardTable
            title="Feature Parameters"
            className="h-[290px]"
        >
            {rows.map((row, index) => (
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