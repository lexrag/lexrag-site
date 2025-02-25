import CurveUp from "@/components/Landing/CurveUp";
import PricingPlans from "@/components/Landing/PricingPlans";
import CurveDown from "@/components/Landing/CurveDown";

const PricingSection = () => {
    return (
        <>
            <CurveUp/>
            <div className="bg-[#13263C] pr-[10%] pl-[10%]">
                <div className="text-center">

                    <h3 className="text-white text-2xl md:text-4xl pt-5 mb-5 font-semibold">
                        Clear Pricing Makes it Easy
                    </h3>

                    <p className="text-gray-600">
                        Save thousands to millions of bucks by using single tool <br/>
                        for different amazing and great useful admin
                    </p>

                </div>

                <div className="mt-5 pb-5">
                    <PricingPlans />
                </div>
            </div>
            <CurveDown/>
        </>
    )
}

export default PricingSection;
