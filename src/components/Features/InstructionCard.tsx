"use client";

import CardFlash from "@/components/Layout/CardFlash";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const InstructionCard = () => {
    const [instructionCardDetails, setInstructionCardDetails] = useState(null);
    const [instructionCardFeatures, setInstructionCardFeatures] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const pageName = pathname.split("/").filter(Boolean).pop() || "GraphVisualization";

        // Преобразование из kebab-case в PascalCase
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
                setInstructionCardDetails(module.instructionCardDetails || null);
                setInstructionCardFeatures(module.instructionCardFeatures || []);
            })
            .catch((error) => {
                console.error("Failed to load page data:", error);
            });
    }, [pathname]);

    if (!instructionCardDetails) return null;

    return (
        <>
            <CardFlash {...instructionCardDetails}>
                <div className="grid md:grid-cols-1 gap-2">
                    {instructionCardFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 pe-7.5">
                            <i className="ki-filled ki-check-circle text-base text-success mt-1" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">
                                    {feature.title}
                                </span>
                                <p className="text-xs text-gray-600 mt-1">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardFlash>
        </>
    );
};

export default InstructionCard;