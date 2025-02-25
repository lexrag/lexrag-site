const HowItWorks = () => {
    return (
        <>
            <div className="text-center mb-10">

                <h3 className="text-2xl md:text-4xl mb-5 font-semibold">
                    How it Works
                </h3>

                <p className="text-gray-600">
                    Save thousands to millions of bucks by using single tool <br/>
                    for different amazing and great useful admin
                </p>

            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
                {[
                    {
                        img: "/media/images/how-it-works-1.png",
                        step: 1,
                        title: "Jane Miller",
                        description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                    },
                    {
                        img: "/media/images/how-it-works-2.png",
                        step: 2,
                        title: "Setup Your App",
                        description: "Save thousands to millions of bucks by using a single tool for different amazing and great features."
                    },
                    {
                        img: "/media/images/how-it-works-3.png",
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
                            <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                        </div>
                        <p className="text-gray-500 text-[16px] max-w-[80%]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HowItWorks;
