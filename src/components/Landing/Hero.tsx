import Link from "next/link";
import CurveDown from "@/components/Landing/CurveDown";

const LandingHeading = () => {
    return (
        <>       
            <div className="relative h-[40vh] lg:h-[50vh] flex justify-center items-center">
                
                <div className="absolute inset-0 bg-[#13263C] z-0"></div>

                <div 
                    className="absolute inset-0 z-10 bg-no-repeat bg-contain bg-bottom"
                    style={{
                        backgroundImage: "url(/media/images/singapore_1.png)", 
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center bottom",
                        backgroundBlendMode: "multiply",
                    }}
                >
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to bottom, rgba(19, 38, 60, 0.9) 0%, rgba(19, 38, 60, 0.95) 100%)"
                        }}
                    ></div>
                </div>

                <div className="relative z-20 text-center">
                    <h1 
                        className="text-white tracking-wide font-semibold text-2xl md:text-4xl mb-[20px] transition-all duration-300"
                        style={{ lineHeight: "50px", textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)" }}
                    >
                        <span 
                            style={{
                                background: "linear-gradient(to right, #12CE5D 0%, #FFD80C 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            Confidence in Every Decision
                        </span>
                        <br/>
                        legal AI with graph-vector context 
                        &nbsp;
                    </h1>

                    <Link href="/auth/signin" passHref>
                        <button 
                            className="btn btn-primary transition-transform duration-300 hover:scale-105 shadow-lg"
                        >
                            Try Lexrag
                        </button>
                    </Link>
                </div>
            </div>
            <CurveDown />
        </>
    );
};

export default LandingHeading;