import CurveUp from "@/components/Landing/CurveUp";
import CurveDown from "@/components/Landing/CurveDown";

const HowItWorks = () => {
    return (
        <>
            <CurveUp />

            <div className="bg-[#13263C] min-h-[60vh] py-10">
                <div className="text-center mb-10">

                    <h3 className="text-white text-2xl md:text-4xl mb-5 font-semibold">
                        How it Works
                    </h3>

                    <p className="text-gray-600">
                        Save thousands to millions of bucks by using single tool <br/>
                        for different amazing and great useful admin
                    </p>

                </div>

                <div className=" pr-[10%] pl-[10%] grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-0">
                    {[
                        {
                            img: "/media/images/documents.png",
                            step: 1,
                            title: "Jane Miller",
                            description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                        },
                        {
                            img: "/media/images/documents.png",
                            step: 2,
                            title: "Setup Your App",
                            description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                        },
                        {
                            img: "/media/images/documents.png",
                            step: 3,
                            title: "Enjoy Nautica App",
                            description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                        },
                        {
                            img: "/media/images/documents.png",
                            step: 3,
                            title: "Enjoy Nautica App",
                            description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                        },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center">
                            <img src={item.img} className="max-h-32 mb-6" alt={item.title} />
                            <div className="flex justify-center items-center mb-4">
                                <span className="bg-green-100 text-green-500 rounded-full px-3 py-1 text-md font-bold mr-3">
                                {item.step}
                                </span>
                                <div className="text-lg font-semibold text-white">{item.title}</div>
                            </div>
                            <p className="text-gray-500 text-[16px] max-w-[80%]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* <CurveDown /> */}
        </>
    );
};

export default HowItWorks;
