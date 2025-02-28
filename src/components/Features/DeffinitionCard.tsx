"use client";

import CardFlash from "@/components/Layout/CardFlash";
import { usePageData } from "@/utils/pageDataLoader";

const DeffinitionCard = () => {
    const pageData = usePageData();

    if (!pageData?.deffinitionCardDetails) return null;

    return (
        <CardFlash {...pageData.deffinitionCardDetails} />
    );
};

export default DeffinitionCard;