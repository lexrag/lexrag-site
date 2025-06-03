import HowItWorks from "@/components/Landing/HowItWorks"; 
import Benefits from "@/components/Landing/Benefits";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Landing/Hero";
import ProductFeatures from "@/components/Features/FeaturesGrid";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Lexrag',
    //TODO: add description
}


const LandingPage = () => {
    return (
        <>
            <Header className="bg-[#13263C] fixed top-0 z-10" />

            <main className="">
                <section>
                    <Hero/>
                </section>

                <section id="benefits" className="pr-[10%] pl-[10%]">
                    <Benefits/>
                </section>

                <section id="how-it-works" className="">
                    <HowItWorks/>
                </section>
                
                <section id="product-features" className="">
                    {/* TODO: keep sections title separately for reuse */}
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-4xl pt-28 mb-2 font-semibold transition-colors duration-300 
                            text-gray-900 dark:text-white">
                            Product Features
                        </h3>
                        <p className="text-gray-700 dark:text-gray-400 transition-colors duration-300">
                            Save time and resources by leveraging a single powerful tool for all your legal research needs.
                        </p>
                    </div>
                    <ProductFeatures 
                        gridClassName="grid grid-cols-1 md:grid-cols-4 lg:pr-[14%] lg:pl-[14%] gap-4 min-h-[230px]"
                        showDescription={true}
                        showSideBadges={false} 
                        showBottomBadges={true}
                        maxHeightBeforeShowAll={500}
                    />
                </section>
            </main>

            <Footer />
        </>
    )
}

export default LandingPage;
