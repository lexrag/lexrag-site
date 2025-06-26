import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Layout/Footer';

type GeneralLayoutProps = {
    children: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-col min-h-screen">
                <Header className="fixed top-0 z-10 dark:bg-[#0D0E12] light:bg-white transition-colors py-5 px-[16%]" />
                <main className="flex-grow mt-20">{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default GeneralLayout;
