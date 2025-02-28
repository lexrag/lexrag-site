import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { combinedFeaturesData, FeatureData } from "@/components/Features/FeaturesData";

export const usePageData = () => {
    const [pageData, setPageData] = useState<FeatureData | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        
        const pageKey = pathname.split("/").filter(Boolean).pop() || "graph-visualization";

        console.log(`Поиск данных для страницы: ${pageKey}`);

        const foundData = combinedFeaturesData.find((feature) => feature.key === pageKey);

        if (foundData) {
            setPageData(foundData);
        } else {
            console.error(`Не удалось найти данные для страницы: ${pageKey}`);
            setPageData(null);
        }
    }, [pathname]);

    return pageData;
};