import { Metadata } from 'next';
import HowDocumentsWorks from '@/components/about/HowDocumentsWorks';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';

export const metadata: Metadata = {
    title: 'About',
};

const DocumentWorks = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-y-auto">
            <Header className="" />

            <div className="flex-grow">
                <h2 className="text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4 mt-40">
                    How Document Review Works
                </h2>

                <div className="mb-10">
                    <HowDocumentsWorks />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DocumentWorks;
