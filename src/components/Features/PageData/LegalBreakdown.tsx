import { getBadgeColor } from "@/utils/badgeColorMapping.";


// TODO: Add more data here
export const pageMetadata = {
    title: 'Lexrag | Graph Visualisation',
    description: "Visualize your data in a graph format to better understand the relationships between different entities.",
}

export const deffinitionCardDetails = {
    subtitle: "Deffinition",
    icon: "ki-graph",
    title: "What is Legal Graphs?",
    description: [
        "A Legal Graph is a structured representation of legal information using graph technology, where laws, regulations, court cases, and legal concepts are modeled as interconnected nodes and edges.",
        "This approach enables advanced legal research by visualizing relationships, identifying influential precedents, and uncovering hidden patterns within legal data.",
        "Built on graph database technologies like Neo4j, a Legal Graph facilitates complex queries and analysis, offering legal professionals deeper insights and more precise legal interpretations."
    ],
};

export const instructionCardDetails = {
    subtitle: "Instructions",
    title: "Why and How to Explore Legal Graphs?",
    description: "Visualize legal data in a graph format to better understand the relationships between different legal sources.",
    imgSrcLight: "/media/images/graph.png",
    imgSrcDark: "/media/images/graph.png",
    imgClassName: "max-h-[350px]",
}

export const instructionCardFeatures = [
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


export const featureRows = [
    {
        icon: "ki-lots-shopping",
        label: "Product Category",
        badge: "search", // search, query, storage, analytics
    },
    {
        icon: "ki-tag",
        label: "Available on Plan",
        badge: "freemium", // freemium, basic, advanced, premium
    },
    {
        icon: "ki-medal-star",
        label: "Production Status",
        badge: "development", // development, production
    },
    {
        icon: "ki-underlining",
        label: "API Readiness",
        badge: "not supported", // not supported, suspended, ready
    },
];

export const mappedFeatureRows = featureRows.map((row) => ({
    ...row,
    badgeColor: getBadgeColor(row.badge),
}));