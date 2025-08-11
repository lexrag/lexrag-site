'use client';

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col w-full items-center justify-center">
            <main className="flex-1 min-h-screen w-full flex justify-center mt-20">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </section>
    );
}
