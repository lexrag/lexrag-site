import Link from "next/link";
import CurveDown from "@/components/Landing/CurveDown";

const LandingHeading = () => {
    return (
        <>
            <div className="h-[40vh] lg:h-[60vh] bg-[#13263C] flex justify-center items-center" style={{
                backgroundImage: "url(/media/images/landing.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center top"
            }}>
                <div className="text-center m-auto">
                    <h1 className="text-white tracking-wide font-semibold text-2xl md:text-4xl mb-[30px]"
                        style={{lineHeight: "50px"}}>
                        Unlock Legal Insights Effortlessly <br/>
                        with&nbsp;
                        <span style={{background: "linear-gradient(to right, #12CE5D 0%, #FFD80C 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent"}}>
                                    The Ultimate RAG Solution
                        </span>
                    </h1>

                    <Link href="/auth/signin" className="btn btn-primary">Try Lexrag</Link>
                </div>
            </div>

            <CurveDown />
        </>
    )
}

export default LandingHeading;
