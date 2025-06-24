"use client";

const Benefits = () => {
    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-0 mb-20">
            {[
                {
                    img: "medal",
                    title: "No AI Hallucinations",
                    description:
                        "GraphRAG technology ensures unmatched accuracy and delivers contextually precise legal responses",
                },
                {
                    img: "cloud-saas",
                    title: "Graph-Vector Search",
                    description:
                        "Leverage Graph Schema to enrich semantic search results and gain complete and accurate legal context",
                },
                {
                    img: "a-bag-of-money",
                    title: "Fast & Cost-Effective",
                    description:
                        "Significantly boost your legal research and drafting efficiency, reducing time and effort while cutting costs.",
                },
                {
                    img: "mosaic-lamp",
                    title: "Flexible & Scalable",
                    description:
                        "API-based modular architecture enables integration with a variety of cloud or on-premises LLMs",
                },
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center transition-colors"
                >
                    <img
                        src={`/media/images/${item.img}.png`}
                        className="dark:hidden max-h-32 mb-6"
                        alt={`${item.title} light`}
                    />
                    <img
                        src={`/media/images/${item.img}-dark.png`}
                        className="hidden dark:block max-h-32 mb-6"
                        alt={`${item.title} dark`}
                    />

                    <div className="flex justify-center items-center mb-4">
                        <div className="text-lg font-semibold text-black dark:text-white">
                            {item.title}
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-[16px] max-w-[80%]">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Benefits;