import Link from "next/link";
import HowItWorks from "@/components/Landing/HowItWorks";
import LandingHeading from "@/components/Landing/LandingHeading";
import Statistics from "@/components/Landing/Statistics";
import Testimonials from "@/components/Landing/Testimonials";
import OurTeam from "@/components/Landing/OurTeam";
import PricingSection from "@/components/Landing/PricingSection";
import LandingFooter from "@/components/Landing/LandingFooter";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Lexrag',
    //TODO: add description
}


const LandingPage = () => {
    return (
        <>
            <header className="flex items-center justify-between w-full p-5 pl-[10%] pr-[10%] bg-[#13263C]">
                <img className="max-h-[20px] sm:max-h-[40px] mr-5" src="/media/lexrag-logo-dark.svg" alt="lexrag logo"/>
                <Link href={"/auth/signin"} className="btn btn-primary">Sign In</Link>
            </header>

            <main className="w-full">
                <section>
                    <LandingHeading/>
                </section>

                <section className="pr-[10%] pl-[10%] mb-10">
                    <HowItWorks/>
                </section>

                <section className="mb-10">
                    <Statistics/>
                </section>

                <section className="pr-[10%] pl-[10%] mb-10">
                    <OurTeam/>
                </section>

                <section className="mb-10">
                    <PricingSection/>
                </section>

                <section className="pr-[10%] pl-[10%]">
                    <Testimonials/>
                </section>
            </main>

            <LandingFooter />
        </>
    )
}

export default LandingPage;
