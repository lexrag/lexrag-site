import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import UseCases from '@/components/Landing/UseCases';
import PageTitle from '@/components/Layout/PageTitle';

export const metadata: Metadata = {
    title: 'Use Cases - LEXRAG',
    description: 'Discover how LEXRAG can be used in various legal scenarios and applications',
};

const UseCasesPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="Use Cases" finalTitle="Use Cases" />

                <section id="use-cases" className="pb-20">
                    <UseCases />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default UseCasesPage;
