"use client";

import CardFlash from "@/components/Layout/CardFlash";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DeffinitionCard = () => {
    const [cardDetails, setCardDetails] = useState(null);
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
                setCardDetails(module.deffinitionCardDetails);
            })
            .catch((error) => {
                console.error("Failed to load page data:", error);
            });
    }, [pathname]);

    if (!cardDetails) return null;

    return (
        <>
            <CardFlash {...cardDetails} />
        </>
    );
};

export default DeffinitionCard;