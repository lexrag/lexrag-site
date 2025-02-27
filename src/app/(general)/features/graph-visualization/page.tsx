import Navigation from "@/components/Layout/PageTitle";
import { Metadata } from "next";
import CardWithPic from "@/components/Features/CardWithPic";

export const metadata: Metadata = {
    title: 'Lexrag | Graph Visualization',
    //TODO: add description
};

const graphFeatures = [
    {
        title: "Node Size and Color Indicators",
        description: "Larger nodes representing more influential laws or court cases, and color-coding for different legal areas",
    },
    {
        title: "Clustering and Grouping",
        description: "Spotting legal domains or thematic clusters (e.g., family law, corporate law) through graph segmentation",
    },
    {
        title: "Centrality and Hub Detection",
        description: "Detecting hub entities that connect multiple legal areas or link many legal cases",
    },
    {
        title: "Path Analysis and Legal Chains",
        description: "Visualization of legal chains showing the flow of influence from one decision or law to another",
    },
    {
        title: "Anomaly and Outlier Visualization",
        description: "Spotting isolated nodes or unexpected links that might indicate rare or unique legal cases",
    },
];

const Features = () => {
    return (
        <>
            <Navigation />

            <section className="pr-[15%] pl-[15%]">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
                    <div className="col-span-2">

                        <CardWithPic
                            title="How Exploring Legal Graph?"
                            description="Visualize your data in a graph format to better understand the relationships between different entities."
                            imgSrc="/media/images/graph.png"
                            clasName="max-h-[350px]"
                        >
                            <div className="grid md:grid-cols-1 gap-2">
                                {graphFeatures.map((feature, index) => (
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
                        </CardWithPic>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;