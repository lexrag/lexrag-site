"use client";

import PageTitle from "@/components/Layout/PageTitle";
import CardFlash from "@/components/Layout/CardFlash";
import dynamic from "next/dynamic";
import Image from "next/image";
import ScrollspyNav from "../../../../utils/scrollspy";

// const ScrollspyNav = dynamic(() => import("../../../../utils/scrollspy"), { ssr: false });

const menuItems = [
  { id: "item_1", title: "Introduction" },
  { id: "item_2", title: "Technological Concept" },
  { id: "item_3", title: "Advantages" },
  { id: "item_4", title: "Use Cases" },
];

const Article = () => {
  return (
    <>
      <PageTitle title="GraphRAG Technology For Law" finalTitle="GraphRAG" />

      <div className="pr-[15%] pl-[15%]">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 lg:gap-7.5">
          {/* Scrollspy Navigation */}
          <div className="flex flex-col gap-5 lg:gap-7.5 col-span-1">
            <ScrollspyNav items={menuItems} />
          </div>

          <div className="flex flex-col gap-5 lg:gap-7.5 col-span-3">
            <div className="flex flex-col h-[700px] scrollable-y gap-5 pr-2 scrollbar-hide" id="scrollable_1">
              
              <h2 className="text-1.5xl font-medium text-center text-gray-900 ml-5 mb-5" suppressHydrationWarning>
                Revolutionizing Legal Analysis with Graph-Vector Technology
              </h2>

              {/* Section 1 */}
              <div id="item_1" className="mb-5">
                <CardFlash
                  title="The Challenge of Traditional Legal Information Structuring"
                  subtitle="Introduction"
                  imgClassName="h-[350px]"
                  imgSrcDark="/media/images/graph.png"
                  imgSrcLight="/media/images/graph.png"
                  description={[
                    "The legal industry has long faced the challenge of processing vast amounts of fragmented information. Traditional methods of organizing and searching are often ineffective due to the complexity of interconnections among legislative acts, case law, and regulatory documents.",
                    "This results in the loss of valuable data and decreased analytical precision. In an era of rapid artificial intelligence development, a new approach is needed to deliver deep, contextual analysis.",
                    "This is where GraphRAG comes into play—a technology already recognized in the IT sphere, as highlighted by publications on neo4j.com.",
                  ]}
                />
              </div>

              {/* Section 2 */}
              <div id="item_2">
                <CardFlash
                  title="How GraphRAG Works"
                  subtitle="Technological Concept"
                  description={[
                    "GraphRAG is a synthesis of graph databases and retrieval-augmented generation mechanisms. It leverages a graph structure to model the complex interrelations among legal norms, organizing data into nodes and edges. Additionally, vector representations capture the meaning and context of each element, which is crucial for analyzing legislative acts.",
                    "In practice, the system structures information by interconnecting legislative acts, articles, paragraphs, and court decisions into a unified network that reflects genuine logical relationships. It then integrates with generative models, retrieving relevant data from the graph database and generating precise, well-founded answers using large language models.",
                    "Publications on neo4j.com highlight the practical applications of GraphRAG across various fields, demonstrating its flexibility and scalability."
                  ]}
                />
              </div>

              {/* Section 3 */}
              <div id="item_3">
                <CardFlash
                  title="Enhancing Legal Analysis for the Singaporean and Asian Markets"
                  subtitle="Advantages"
                  description={[
                    "Implementing GraphRAG in legal practice opens up new opportunities for optimizing the processing of legislative data, particularly in dynamic Asian markets. LEXRAG, built on a graph-vector database of Singaporean legislation, offers significant advantages.",
                    "It delivers high search accuracy by uncovering subtle interconnections between legal norms, reducing the risk of errors by providing answers based on verified, structured data. This is especially critical in legal environments with strict accuracy requirements.",
                    "Moreover, GraphRAG optimizes processes by automating search and analysis, dramatically cutting down the time needed for preparing legal opinions. Its flexibility and scalability allow it to adapt to the specific requirements of Singaporean and other Asian legal systems.",
                    "Unlike outdated fine-tuning methods for LLMs, GraphRAG provides dynamic data integration and updates without the need for retraining, reducing costs while ensuring highly relevant conclusions."
                  ]}
                />
              </div>

              {/* Section 4 */}
              <div id="item_4">
                <CardFlash
                  title="Guaranteeing LEXRAG Success"
                  subtitle="Use Cases and Conclusion"
                  description={[
                    "GraphRAG has already been successfully implemented by LEXRAG, as demonstrated by practical use cases featured on our website. Specific applications include handling case law, preparing legal opinions, and supporting legal research.",
                    "The technology enables rapid and precise analysis of the interconnections among precedents, legislative acts, and regulatory documents, resulting in well-founded legal opinions. Automated analytical reports significantly enhance the credibility of the outcomes.",
                    "Furthermore, tools for both academic and practical research enable the visualization of complex legal relationships in Singapore and other Asian jurisdictions. The integration of GraphRAG ensures that every response is not only precise but also based on up-to-date, structured information—a crucial factor for market success.",
                    "By leveraging GraphRAG, LEXRAG operates effectively in a rapidly changing legislative landscape, outpacing competitors who rely on outdated fine-tuning methods. This adoption guarantees unmatched accuracy, transparency, and responsiveness in legal analysis, solidifying LEXRAG’s leadership in innovative legal technologies."
                  ]}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;