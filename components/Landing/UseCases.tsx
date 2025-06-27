import CurveUp from "@/components/Landing/CurveUp";

const UseCases = () => {
    return (
        <>
            <CurveUp />

            <div className="bg-[#13263C] min-h-[60vh] py-10">
                <div className="text-center mb-10">
                    <h3 className="text-white text-2xl md:text-4xl mb-5 font-semibold">
                        Use Cases
                    </h3>
                    <p className="font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        Power every legal task — from research to risk — with retrieval-augmented AI<br/>
                    </p>
                </div>

                <div className="pr-[10%] pl-[10%] grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-0">
                {[
                {
                    img: "books",
                    title: "AI-Powered Legal Research",
                    description:
                        "Advanced legal search with graph visualization, semantic search, and AI-driven query decomposition, providing precise and contextualized legal insights",
                },
                {
                    img: "report",
                    title: "Early Case Assessment & Guidance",
                    description:
                        "Generates structured case summaries, predicts outcomes, and offers legal strategy recommendations, leveraging judicial and legislative analytics.",
                },
                {
                    img: "folder-with-documents",
                    title: "Legal Knowledge & Compliance Storage",
                    description:
                        "Manages legal documents, case dossiers, and AI-powered context storage, with secure on-premises LLM integration for compliance",
                },
                {
                    img: "building",
                    title: "Litigation Strategy & Risk Assessment",
                    description:
                        "Analyzes legal risks, judicial trends, and legislative changes, providing AI-driven insights for litigation planning and case forecasting",
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
                        <div className="text-lg font-semibold text-white dark:text-white">
                            {item.title}
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 text-[16px] max-w-[80%]">
                        {item.description}
                    </p>
                </div>
            ))}
                </div>
            </div>
        </>
    );
};

export default UseCases;