import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageDataModule {
    deffinitionCardDetails?: any;
    instructionCardDetails?: any;
    instructionCardFeatures?: any[];
    mappedFeatureRows?: any[];
}

const toPascalCase = (str: string) =>
    str
        .toLowerCase()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

export const usePageData = () => {
    const [pageData, setPageData] = useState<PageDataModule | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const pageName = pathname.split("/").filter(Boolean).pop() || "GraphVisualization";
        const pascalCasePageName = toPascalCase(pageName);

        console.log(`Importing module from: /components/Features/PageData/${pascalCasePageName}.tsx`);

        import(`@/components/Features/PageData/${pascalCasePageName}.tsx`)
            .then((module) => {
                setPageData(module);
            })
            .catch((error) => {
                console.error("Failed to load page data:", error);
                setPageData(null);
            });
    }, [pathname]);

    return pageData;
};