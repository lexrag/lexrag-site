import { Metadata } from 'next';
import { RoadMap } from '@/components/about/RoadMap';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';

export const metadata: Metadata = {
    title: 'About',
};

const About = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-y-auto">
            <Header className="" />

            <div className="flex-grow">
                <h2 className="mb-28 text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4 mt-40">
                    Roadmap & Vision
                </h2>

                <div className="mb-10">
                    <RoadMap />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
