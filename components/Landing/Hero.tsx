import CurveDown from '@/components/Landing/CurveDown';

const LandingHeading = () => {
    return (
        <>
            <div className="relative h-[55vh] lg:h-[65vh] flex justify-center items-center">
                <div className="absolute inset-0 bg-[#13263C]"></div>
                
                {/* Dot Pattern Background */}
                <div className="absolute inset-0 opacity-80">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
                    }}></div>
                </div>

                <div
                    className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40"
                    style={{
                        backgroundImage: 'url(/media/images/singapore_1.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center bottom',
                        backgroundBlendMode: 'multiply',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-90"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(19, 38, 60, 0.9) 0%, rgba(19, 38, 60, 0.95) 100%)',
                        }}
                    ></div>
                </div>

                <div
                    className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40"
                    style={{
                        backgroundImage: 'url(/media/images/singapore_1.svg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center bottom',
                        backgroundBlendMode: 'multiply',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-90"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(19, 38, 60, 0.9) 0%, rgba(19, 38, 60, 0.95) 100%)',
                        }}
                    ></div>
                </div>

                <div className="relative text-center flex flex-col items-center justify-center">
                    <h1
                        className=""
                        style={{
                            lineHeight: '70px',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <span className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Confidence in Every Decision
                        </span>
                        <br />
                        <span className="text-white tracking-wide font-semibold text-4xl md:text-4xl mb-5 transition-all duration-300">
                            legal AI with graph-vector context
                        </span>
                    </h1>

                    <a 
                        href="https://app.lexrag.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                    >
                        Try LEXRAG
                    </a>
                </div>
            </div>
            <CurveDown />
        </>
    );
};

export default LandingHeading;
