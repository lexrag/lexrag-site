'use client';

import Header from '@/components/Header/Header';

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-cloud-tint">
            <div className="flex flex-col w-full items-center justify-center max-w-7xl mx-auto">
                <Header className="" />
                <div className="flex flex-row w-full relative">
                    <main className="min-h-screen w-full">{children}</main>
                </div>
            </div>
        </section>
    );
}
