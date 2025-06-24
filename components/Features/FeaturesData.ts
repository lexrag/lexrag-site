import { getBadgeColor } from "@/utils/badgeColorMapping.";

export interface FeatureData {
    key: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    plan: string;
    link: string;
    pageMetadata: {
        title: string;
        description: string;
    };
    deffinitionCardDetails: {
        subtitle: string;
        icon: string;
        title: string;
        description: string[];
    };
    instructionCardDetails: {
        subtitle: string;
        title: string;
        description: string;
        imgSrcLight: string;
        imgSrcDark: string;
        imgClassName: string;
    };
    instructionCardFeatures: {
        title: string;
        description: string;
    }[];
    featureRows: {
        icon: string;
        label: string;
        badge: string;
        badgeColor: string;
    }[];
}

const generateFeatureRows = (rows: { icon: string; label: string; badge: string }[]) => {
    return rows.map((row) => ({
        ...row,
        badgeColor: getBadgeColor(row.badge),
    }));
};

export const combinedFeaturesData: FeatureData[] = [
    {
        key: "graph-visualization",
        icon: "ki-graph",
        title: "Graph Visualization",
        subtitle: "Seamlessly explore legal data",
        description: "Interactive graph displays relations and properties of case law and legislation",
        category: "search",
        plan: "freemium",
        link: "/features/graph-visualization",
        pageMetadata: {
            title: "Lexrag | Graph Visualisation",
            description: "Visualize your data in a graph format to better understand the relationships between different entities.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-graph",
            title: "What is Legal Graphs?",
            description: [
                "A Legal Graph is a structured representation of legal information using graph technology, where laws, regulations, court cases, and legal concepts are modeled as interconnected nodes and edges.",
                "This approach enables advanced legal research by visualizing relationships, identifying influential precedents, and uncovering hidden patterns within legal data.",
                "Built on graph database technologies like Neo4j, a Legal Graph facilitates complex queries and analysis, offering legal professionals deeper insights and more precise legal interpretations.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "Why and How to Explore Legal Graphs?",
            description: "Visualize legal data in a graph format to better understand the relationships between different legal sources.",
            imgSrcLight: "/media/images/graph.png",
            imgSrcDark: "/media/images/graph.png",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
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
        ],
        featureRows: generateFeatureRows([
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
                badge: "not supported", // ready, not supported, suspended
            },
        ]),
    },

    {
        key: "semantic-attributes",
        icon: "ki-price-tag",
        title: "Semantic Attributes",
        subtitle: "No more keyword search",
        description: "Obtain case law and legislation attrs with natural language queries",
        category: "search",
        plan: "freemium",
        link: "/features/semantic-attributes",
        pageMetadata: {
            title: "Lexrag | Semantic Attributes",
            description: "Enhance your legal search with semantic attributes, going beyond simple keyword matching.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-price-tag",
            title: "What are Semantic Attributes?",
            description: [
                "Semantic attributes provide a deeper understanding of legal texts by interpreting the meaning and context behind the words.",
                "Unlike traditional keyword searches, semantic attributes allow for nuanced queries that capture legal concepts and relationships.",
                "This approach improves the accuracy and relevance of search results within legal databases and documents.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "Why and How to Use Semantic Attributes?",
            description: "Learn to utilize semantic attributes to refine legal searches and enhance query precision.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Enhanced Query Interpretation",
                description: "Understand legal concepts through natural language processing for accurate search results.",
            },
            {
                title: "Contextual Matching",
                description: "Find relevant legal documents even when exact keywords are not present.",
            },
            {
                title: "Advanced Legal Taxonomies",
                description: "Use pre-built legal ontologies to map queries to legal concepts.",
            },
            {
                title: "Automatic Synonym Recognition",
                description: "Expand search results by automatically including synonyms and related terms.",
            },
            {
                title: "Dynamic Query Suggestions",
                description: "Get real-time suggestions to refine and enhance search queries.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "search",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "freemium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "suspended",
            },
        ]),
    },

    {
        key: "semantic-graph",
        icon: "ki-data",
        title: "Semantic Graph",
        subtitle: "Find hidden ties in legal data",
        description: "Get entire text graph tree of legislation with natural language queries",
        category: "search",
        plan: "basic",
        link: "/features/semantic-graph",
        pageMetadata: {
            title: "Lexrag | Semantic Graph",
            description: "Uncover hidden connections in legal texts with the power of semantic graph technology.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-data",
            title: "What is a Semantic Graph?",
            description: [
                "A Semantic Graph represents legal documents and data as interconnected nodes and edges, highlighting relationships and hierarchies.",
                "It enables advanced visualization and exploration of legal information through graph-based structures.",
                "Semantic Graphs facilitate complex queries by mapping legal terms and concepts to their contextual meanings.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Leverage Semantic Graphs?",
            description: "Explore the entire graph tree of legislation and discover hidden legal relationships.",
            imgSrcLight: "/media/images/semantic-graph.png",
            imgSrcDark: "/media/images/semantic-graph-dark.png",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Visualized Legal Connections",
                description: "See the relationships between laws, regulations, and legal concepts visually.",
            },
            {
                title: "Hierarchical Mapping",
                description: "Navigate through legal documents in a structured and hierarchical graph format.",
            },
            {
                title: "Contextual Legal Analysis",
                description: "Understand legal data within its broader context by exploring graph pathways.",
            },
            {
                title: "Pattern Recognition",
                description: "Identify trends and patterns in legal interpretations and case law.",
            },
            {
                title: "Dynamic Data Navigation",
                description: "Effortlessly move through legal data by clicking on graph nodes and edges.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "search",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "basic",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "full-semantic-search",
        icon: "ki-abstract-26",
        title: "Full Semantic Search",
        subtitle: "Top notch graph-vector query",
        description: "Graph relations and semantic results create a synergistic enrichment cycle",
        category: "search",
        plan: "advanced",
        link: "/features/full-semantic-search",
        pageMetadata: {
            title: "Lexrag | Full Semantic Search",
            description: "Experience advanced legal research with comprehensive graph-vector queries.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-abstract-26",
            title: "What is Full Semantic Search?",
            description: [
                "Full Semantic Search combines graph technology with semantic analysis to deliver highly relevant legal search results.",
                "It leverages both structural and contextual data to enhance the accuracy of legal research.",
                "By integrating graph relations and semantic understanding, this feature provides deeper insights into legal queries.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Full Semantic Search?",
            description: "Enhance your legal research with powerful graph-vector based semantic search capabilities.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Hybrid Query System",
                description: "Combines graph-based and semantic search techniques for maximum accuracy.",
            },
            {
                title: "Contextual Analysis",
                description: "Understands the context of legal terms within documents and queries.",
            },
            {
                title: "Enhanced Search Relevance",
                description: "Provides more precise results by mapping queries to legal concepts and relationships.",
            },
            {
                title: "Dynamic Filtering",
                description: "Filter search results dynamically based on legal categories and document types.",
            },
            {
                title: "Graph-Vector Synergy",
                description: "Utilizes vector embeddings to enrich graph-based search outputs.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "search",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "advanced",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "legal-breakdown",
        icon: "ki-abstract-14",
        title: "Legal Breakdown",
        subtitle: "Simplify complex legal data",
        description: "Decompose queries and extract concepts for precise legal answers",
        category: "query",
        plan: "freemium",
        link: "/features/legal-breakdown",
        pageMetadata: {
            title: "Lexrag | Legal Breakdown",
            description: "Break down complex legal queries into manageable and understandable components.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-abstract-14",
            title: "What is Legal Breakdown",
            description: [
                "Legal Breakdown helps decompose complex legal queries into smaller, manageable components.",
                "It identifies key legal concepts, relationships, and elements within your query.",
                "This feature enhances query precision by providing a structured approach to legal research.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Utilize Legal Breakdown?",
            description: "Leverage this feature to simplify and dissect complex legal queries with precision.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Query Decomposition",
                description: "Automatically breaks down complex queries into smaller, focused questions.",
            },
            {
                title: "Concept Extraction",
                description: "Identifies legal concepts, principles, and terminologies from queries.",
            },
            {
                title: "Contextual Mapping",
                description: "Maps decomposed elements to relevant legal frameworks and documents.",
            },
            {
                title: "Enhanced Accuracy",
                description: "Improves the precision of legal responses by focusing on specific query elements.",
            },
            {
                title: "Legal Conceptualization",
                description: "Provides deeper insights by categorizing legal concepts and relationships.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "query",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "freemium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "base-query",
        icon: "ki-note-2",
        title: "Base Query",
        subtitle: "Fast and easy response",
        description: "Get simple and accurate answers from GraphRAG-backed legal AI assistant",
        category: "query",
        plan: "basic",
        link: "/features/base-query",
        pageMetadata: {
            title: "Lexrag | Base Query",
            description: "Obtain quick and precise legal answers through simplified base queries.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-note-2",
            title: "What is Base Query?",
            description: [
                "The Base Query feature offers a straightforward method to obtain legal answers.",
                "It is designed for quick, accurate responses to direct legal questions.",
                "Ideal for scenarios requiring rapid access to specific legal information.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Base Query?",
            description: "Input your legal query to receive fast and relevant answers from our AI assistant.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Simple Query Input",
                description: "Allows you to enter direct legal questions for immediate answers.",
            },
            {
                title: "High Accuracy",
                description: "Ensures responses are precise and relevant to the legal domain.",
            },
            {
                title: "Fast Response Time",
                description: "Provides answers quickly to enhance productivity and efficiency.",
            },
            {
                title: "Contextual Relevance",
                description: "Uses legal databases and context to provide the best possible answers.",
            },
            {
                title: "Legal Compliance",
                description: "Maintains adherence to legal standards and frameworks.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "query",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "basic",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "advanced-query",
        icon: "ki-book-open",
        title: "Advanced Query",
        subtitle: "Delve deeper and broader",
        description: "Build complex queries with detailed legal analysis and stylized responses",
        category: "query",
        plan: "advanced",
        link: "/features/advanced-query",
        pageMetadata: {
            title: "Lexrag | Advanced Query",
            description: "Conduct in-depth legal research and analysis with complex query capabilities.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-book-open",
            title: "What is Advanced Query?",
            description: [
                "The Advanced Query feature enables legal professionals to perform detailed and complex searches.",
                "It supports multi-layered queries and provides nuanced legal interpretations.",
                "Ideal for in-depth legal analysis and crafting sophisticated legal arguments.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Advanced Query?",
            description: "Input complex legal queries to receive detailed analyses and stylized responses.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Multi-Layered Queries",
                description: "Support for nested and conditional legal queries.",
            },
            {
                title: "Deep Legal Analysis",
                description: "Provides thorough legal interpretations and insights.",
            },
            {
                title: "Customizable Outputs",
                description: "Generates stylized responses tailored to legal professionals' needs.",
            },
            {
                title: "Supports Boolean Logic",
                description: "Allows the use of advanced logical operators for precise searches.",
            },
            {
                title: "High Relevance",
                description: "Ensures that responses are highly relevant to complex legal contexts.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "query",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "advanced",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "interactive-model",
        icon: "ki-artificial-intelligence",
        title: "Interactive Model",
        subtitle: "LLM asks for relevant data",
        description: "AI assistant identifies and fills critical domain-specific information gaps",
        category: "query",
        plan: "premium",
        link: "/features/interactive-model",
        pageMetadata: {
            title: "Lexrag | Interactive Model",
            description: "Engage with an AI model that actively requests relevant data to enhance responses.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-artificial-intelligence",
            title: "What is an Interactive Model?",
            description: [
                "The Interactive Model feature uses advanced AI to interactively request additional information.",
                "It helps to refine queries by filling in critical gaps and ensuring accurate responses.",
                "Ideal for complex legal scenarios where detailed context is necessary for precision.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use the Interactive Model?",
            description: "Engage with the AI assistant by answering follow-up questions to enhance query results.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Proactive Query Refinement",
                description: "The model asks clarifying questions to improve accuracy.",
            },
            {
                title: "Enhanced Legal Analysis",
                description: "Provides deeper insights by gathering more specific information.",
            },
            {
                title: "Adaptable to Context",
                description: "Changes its questioning based on the legal domain and complexity.",
            },
            {
                title: "Fills Information Gaps",
                description: "Identifies and fills gaps in user-provided data for more precise answers.",
            },
            {
                title: "Improves Over Time",
                description: "Learns from interactions to offer better follow-up questions in the future.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "query",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "contexts-management",
        icon: "ki-element-11",
        title: "Contexts Management",
        subtitle: "Store and share legal sources",
        description: "Choose and control legal sources used by the AI assistant in queries",
        category: "storage",
        plan: "basic",
        link: "/features/contexts-management",
        pageMetadata: {
            title: "Lexrag | Contexts Management",
            description: "Manage and curate the legal contexts that guide the AI's responses.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-element-11",
            title: "What is Contexts Management?",
            description: [
                "Contexts Management allows users to select and maintain specific legal sources for AI queries.",
                "It ensures that the AI assistant references only the most relevant and authoritative legal information.",
                "Ideal for professionals who need precise control over the legal context used in responses.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Contexts Management?",
            description: "Set preferred legal sources and manage context collections to refine AI query responses.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Context Selection",
                description: "Choose specific legal documents or datasets for AI references.",
            },
            {
                title: "Custom Context Libraries",
                description: "Build collections of legal sources for different query scenarios.",
            },
            {
                title: "Source Control",
                description: "Restrict AI to using only approved and verified legal sources.",
            },
            {
                title: "Version Management",
                description: "Maintain historical and current versions of legal documents.",
            },
            {
                title: "Collaboration Tools",
                description: "Share context collections with colleagues for consistent responses.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "storage",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "basic",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "dossier-compilation",
        icon: "ki-questionnaire-tablet",
        title: "Dossier Compilation",
        subtitle: "Save and reuse valuable facts",
        description: "Manage and utilize project-specific legal data in a structured manner",
        category: "storage",
        plan: "advanced",
        link: "/features/dossier-compilation",
        pageMetadata: {
            title: "Lexrag | Dossier Compilation",
            description: "Organize and compile legal dossiers for streamlined research and case management.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-questionnaire-tablet",
            title: "What is Dossier Compilation?",
            description: [
                "Dossier Compilation involves gathering, organizing, and managing legal documents and data in a structured format.",
                "This feature allows users to compile project-specific information, making it easily accessible for legal research and analysis.",
                "Ideal for creating comprehensive records for cases, legal projects, and research initiatives.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Utilize Dossier Compilation?",
            description: "Create and manage detailed dossiers with relevant legal documents and structured data.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Document Aggregation",
                description: "Collect relevant legal documents and organize them into a dossier.",
            },
            {
                title: "Customizable Templates",
                description: "Use predefined templates or create custom ones for dossier structuring.",
            },
            {
                title: "Collaboration Tools",
                description: "Allow team members to contribute to and access dossiers securely.",
            },
            {
                title: "Data Export and Sharing",
                description: "Export dossiers to different formats and share them with stakeholders.",
            },
            {
                title: "Search and Filter Capabilities",
                description: "Quickly find information within compiled dossiers using advanced search tools.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "storage",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "advanced",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "document-upload",
        icon: "ki-paper-clip",
        title: "Document Upload",
        subtitle: "Analyse and use your docs",
        description: "Parse and decompose your legal documents for AI assistant queries",
        category: "storage",
        plan: "premium",
        link: "/features/document-upload",
        pageMetadata: {
            title: "Lexrag | Document Upload",
            description: "Upload and analyze your legal documents to enhance AI-assisted legal research and insights.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-paper-clip",
            title: "What is Document Upload?",
            description: [
                "Document Upload allows users to upload legal documents directly into the Lexrag system for analysis.",
                "Uploaded documents are parsed and structured, enabling advanced queries and integration with the AI assistant.",
                "The feature supports various document formats, including PDFs, Word files, and plain text.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Document Upload?",
            description: "Easily upload legal documents, analyze content, and integrate results with AI-assisted queries.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Multiple Format Support",
                description: "Upload documents in PDF, Word, or text formats for analysis.",
            },
            {
                title: "Automatic Parsing",
                description: "Extract key information and structure documents for legal queries.",
            },
            {
                title: "Data Integration",
                description: "Integrate parsed data with AI assistant for accurate responses.",
            },
            {
                title: "Metadata Analysis",
                description: "Analyze metadata and embedded information within uploaded documents.",
            },
            {
                title: "Secure Storage",
                description: "Ensure all uploaded documents are stored securely with compliance to legal standards.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "storage",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "on-premises-llm",
        icon: "ki-cloud-download",
        title: "On-premises LLM",
        subtitle: "Connect self-hosted LLMs",
        description: "Guard your data and connect your on-premises LLMs to our AI tools",
        category: "storage",
        plan: "premium",
        link: "/features/on-premises-llm",
        pageMetadata: {
            title: "Lexrag | On-premises LLM",
            description: "Integrate your on-premises large language models (LLMs) securely with Lexrag's AI tools.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-cloud-download",
            title: "What is On-premises LLM?",
            description: [
                "On-premises LLM integration allows organizations to connect their own large language models with Lexrag's AI tools.",
                "This feature provides full control over data privacy, ensuring sensitive information is not exposed to external environments.",
                "It is ideal for organizations with stringent data security and compliance requirements.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Connect Your On-premises LLM?",
            description: "Easily integrate your self-hosted LLMs with Lexrag to enhance AI-driven legal insights.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Full Data Control",
                description: "Keep all your data within your infrastructure by connecting your own LLM.",
            },
            {
                title: "Enhanced Security",
                description: "Ensure compliance with internal data governance and legal standards.",
            },
            {
                title: "Custom Model Compatibility",
                description: "Integrate with different LLMs, including open-source and proprietary models.",
            },
            {
                title: "Local Processing",
                description: "Perform all AI operations within your on-premises environment.",
            },
            {
                title: "Seamless Integration",
                description: "Connect easily through standardized APIs and tools.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "storage",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "base-analytics",
        icon: "ki-chart-simple",
        title: "Base Analytics",
        subtitle: "Gain insights from our data",
        description: "Analyze legal domain trends and patterns with predefined metrics",
        category: "analytics",
        plan: "advanced",
        link: "/features/base-analytics",
        pageMetadata: {
            title: "Lexrag | Base Analytics",
            description: "Unlock valuable insights into legal trends and patterns using Lexrag's Base Analytics feature.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-chart-simple",
            title: "What is Base Analytics?",
            description: [
                "Base Analytics provides fundamental analytical tools to explore legal data trends and patterns.",
                "It allows users to access predefined metrics and visualize data to make informed decisions.",
                "Ideal for basic legal research and trend analysis within specific domains or jurisdictions.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Base Analytics?",
            description: "Leverage predefined metrics to analyze legal trends and patterns effectively.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Predefined Metrics",
                description: "Access built-in metrics to quickly assess legal data trends.",
            },
            {
                title: "Visual Data Insights",
                description: "Generate graphs and charts for easy interpretation of legal patterns.",
            },
            {
                title: "Trend Analysis",
                description: "Identify shifts in legal interpretations and regulatory changes.",
            },
            {
                title: "Data Filtering",
                description: "Narrow down analytics to specific jurisdictions or legal domains.",
            },
            {
                title: "Exportable Reports",
                description: "Create and export analytical reports for sharing and documentation.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "analytics",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "advanced",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "judicial-analytics",
        icon: "ki-brifecase-tick",
        title: "Judicial Analytics",
        subtitle: "Case law sentimental insights",
        description: "Analyze motivational trends in court decisions with chosen criteria",
        category: "analytics",
        plan: "premium",
        link: "/features/judicial-analytics",
        pageMetadata: {
            title: "Lexrag | Judicial Analytics",
            description: "Discover deep insights into court decision trends and sentiments using Lexrag's Judicial Analytics.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-brifecase-tick",
            title: "What is Judicial Analytics?",
            description: [
                "Judicial Analytics offers tools to analyze trends in court decisions using sentiment analysis and data-driven insights.",
                "It helps legal professionals understand the motivations behind rulings and predict future case outcomes.",
                "By leveraging historical data, it reveals patterns in judicial behavior across various legal domains.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Utilize Judicial Analytics?",
            description: "Leverage sentiment analysis and trend evaluation to gain insights into court decisions.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Sentiment Analysis",
                description: "Evaluate the motivational aspects of judicial decisions.",
            },
            {
                title: "Trend Prediction",
                description: "Forecast potential outcomes of similar future cases.",
            },
            {
                title: "Behavioral Patterns",
                description: "Identify patterns in how specific judges or courts rule on cases.",
            },
            {
                title: "Data-Driven Insights",
                description: "Utilize historical data to support legal strategies.",
            },
            {
                title: "Customized Criteria",
                description: "Analyze judicial decisions based on specific legal factors.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "analytics",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "legislative-analytics",
        icon: "ki-chart",
        title: "Legislative Analytics",
        subtitle: "Track law dynamic and usage",
        description: "Uncover historical and current law trends and their real-world impact",
        category: "analytics",
        plan: "premium",
        link: "/features/legislative-analytics",
        pageMetadata: {
            title: "Lexrag | Legislative Analytics",
            description: "Analyze legislative trends, historical law changes, and their practical implications with Lexrag's Legislative Analytics.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-chart",
            title: "What is Legislative Analytics?",
            description: [
                "Legislative Analytics provides tools to analyze the lifecycle of laws, including creation, amendments, and repeals.",
                "It offers insights into the practical impact of laws by comparing legislative intent with real-world outcomes.",
                "This tool aids in understanding the evolution of legal frameworks and predicting future legislative trends.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Legislative Analytics?",
            description: "Utilize data-driven insights to track legislative changes and their impact on society and industries.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Historical Analysis",
                description: "Examine how laws have evolved over time and their historical context.",
            },
            {
                title: "Impact Assessment",
                description: "Evaluate the real-world effects of legislative changes on specific sectors.",
            },
            {
                title: "Predictive Analytics",
                description: "Forecast potential legal changes based on historical trends.",
            },
            {
                title: "Comparative Analysis",
                description: "Compare legislative frameworks across different jurisdictions.",
            },
            {
                title: "Visualized Law Dynamics",
                description: "Use dynamic charts and graphs to present legislative data clearly.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "analytics",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

    {
        key: "full-analytics",
        icon: "ki-chart-pie-3",
        title: "Full Analytics",
        subtitle: "Panoramic view of law trends",
        description: "Synthesize analytics to uncover trends and forecast legal outcomes",
        category: "analytics",
        plan: "premium",
        link: "/features/full-analytics",
        pageMetadata: {
            title: "Lexrag | Full Analytics",
            description: "Get a comprehensive view of legal trends and use advanced analytics to forecast outcomes with Lexrag's Full Analytics.",
        },
        deffinitionCardDetails: {
            subtitle: "Definition",
            icon: "ki-chart-pie-3",
            title: "What is Full Analytics?",
            description: [
                "Full Analytics offers a holistic approach to analyzing legal data, combining judicial, legislative, and market insights.",
                "It enables a panoramic view of legal trends by integrating multiple data sources and analytical models.",
                "This feature supports legal professionals in making informed decisions by presenting synthesized, data-driven insights.",
            ],
        },
        instructionCardDetails: {
            subtitle: "Instructions",
            title: "How to Use Full Analytics?",
            description: "Leverage integrated analytics to gain a complete understanding of legal trends and anticipate future changes.",
            imgSrcLight: "",
            imgSrcDark: "",
            imgClassName: "max-h-[350px]",
        },
        instructionCardFeatures: [
            {
                title: "Cross-Domain Insights",
                description: "Combine legislative, judicial, and market data for well-rounded analyses.",
            },
            {
                title: "Forecasting Tools",
                description: "Predict future legal trends based on historical and current data.",
            },
            {
                title: "Customizable Dashboards",
                description: "Create dashboards to visualize the most relevant legal metrics.",
            },
            {
                title: "Automated Reporting",
                description: "Generate detailed reports with data visualizations and key insights.",
            },
            {
                title: "AI-Powered Analysis",
                description: "Use machine learning to identify patterns and predict legal outcomes.",
            },
        ],
        featureRows: generateFeatureRows([
            {
                icon: "ki-lots-shopping",
                label: "Product Category",
                badge: "analytics",
            },
            {
                icon: "ki-tag",
                label: "Available on Plan",
                badge: "premium",
            },
            {
                icon: "ki-medal-star",
                label: "Production Status",
                badge: "development",
            },
            {
                icon: "ki-underlining",
                label: "API Readiness",
                badge: "not supported",
            },
        ]),
    },

];