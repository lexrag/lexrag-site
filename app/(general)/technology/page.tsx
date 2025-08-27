import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import HowItWorks from '@/components/technology/HowItWorks';
import IntegrationOptions from '@/components/technology/IntegrationOptions';
import SecurityCompliance from '@/components/technology/SecurityCompliance';
import WhatIs from '@/components/technology/WhatIs';
import WhyItsBetter from '@/components/technology/WhyItsBetter';

const Technology = () => {
    return (
        <div className="overflow-y-hidden">
            <Header />

            <section className="max-w-[1200px] mx-auto pt-20 md:pt-[120px] relative z-10 px-4">
                <h1 className="text-[32px]/[110%] md:text-[64px]/[110%] max-w-[688px] font-normal text-midnight-core">
                    Explainable Legal Intelligence you can verify
                </h1>
                <h4 className="text-[20px]/[21px] md:text-[40px]/[44px] mt-3 md:mt-6 max-w-[692px] text-midnight-core">
                    Graph + Vector + RAG: verifiable results from authoritative legal sources.
                </h4>

                <div className="flex flex-col md:flex-row md:gap-[84px] gap-6 items-start mt-68 md:mt-[52px]">
                    <Link
                        className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                        href="/technology"
                    >
                        Register Free
                    </Link>
                    <Link
                        className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors"
                        href="/technology"
                    >
                        <Image
                            className="w-6 h-6"
                            src="/media/technology/video.svg"
                            alt="video"
                            width={24}
                            height={24}
                        />
                        <span className="text-axis-indigo">Watch demo</span>
                    </Link>
                </div>

                <div className="bg-static-lilac rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-around mt-[54px] mb-[75px]">
                    <Link href="/technology" className="hover:opacity-75 transition-opacity">
                        #Explainable AI
                    </Link>
                    <Link href="/technology" className="hover:opacity-75 transition-opacity">
                        #Source-traceable
                    </Link>
                    <Link href="/technology" className="hover:opacity-75 transition-opacity">
                        #No Vendor Lock-in
                    </Link>
                    <Link href="/technology" className="hover:opacity-75 transition-opacity">
                        #API-ready
                    </Link>
                </div>
            </section>

            <Image
                className="absolute right-0 top-64 md:top-28 md:w-[707px] md:h-[421px] w-[400px] h-[250px]"
                src={'/media/technology/technology.svg'}
                alt="image"
                width={707}
                height={421}
            />

            <WhatIs className="max-w-[1200px] mx-auto px-4" />
            <HowItWorks />
            <WhyItsBetter className="max-w-[1200px] mx-auto  mb-20 md:mb-[128px] px-4" />
            <IntegrationOptions className="max-w-[1200px] mx-auto mb-20 md:mb-[75px] px-4" />
            <SecurityCompliance className="max-w-[1200px] mx-auto mb-[75px] px-4" />

            <div className="flex flex-wrap md:flex-nowrap justify-between  md:justify-center gap-8 md:gap-[84px] mb-[75px] px-4">
                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                    href="/technology"
                >
                    See demo
                </Link>

                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                    href="/technology"
                >
                    Start free
                </Link>
                <Link
                    className="flex items-center gap-[6px] py-2 font-medium text-base px-[36px] border border-phase-green rounded-full hover:bg-phase-green transition-colors text-axis-indigo"
                    href="/technology"
                >
                    See pricing
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default Technology;
