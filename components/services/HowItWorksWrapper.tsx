'use client';

import dynamic from 'next/dynamic';

const HowItWorksSecondary = dynamic(
    () => import('./HowItWorksSecondary'),
    { 
        ssr: false,
        loading: () => (
            <section className="py-12">
                <h2 className="mb-4 md:mb-[40px] text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">
                    How it works
                </h2>
                <div className="relative flex justify-center items-center min-h-[680px] w-full">
                    <div className="relative z-10 w-[220px] h-[190px] bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                </div>
            </section>
        )
    }
);

export default function HowItWorksWrapper({ className }: { className?: string }) {
    return <HowItWorksSecondary className={className} />;
} 