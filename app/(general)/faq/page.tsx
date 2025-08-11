import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import PageTitle from '@/components/Layout/PageTitle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'FAQ - LEXRAG',
    description: 'Frequently asked questions about LEXRAG and our legal technology solutions',
};

const faqs = [
    {
        question: "What is LEXRAG?",
        answer: "LEXRAG is an AI-powered legal research and analysis platform that uses GraphRAG technology to provide comprehensive legal insights. We combine graph databases with retrieval-augmented generation to deliver accurate, contextual legal information."
    },
    {
        question: "How does GraphRAG technology work?",
        answer: "GraphRAG combines graph databases with AI language models. The graph structure maps relationships between legal documents, while the AI retrieves relevant information and generates comprehensive answers. This approach ensures accuracy and provides context that traditional search methods miss."
    },
    {
        question: "What types of legal documents can LEXRAG analyze?",
        answer: "LEXRAG can analyze various legal documents including case law, legislation, regulations, contracts, legal opinions, and academic papers. Our system is designed to handle documents from multiple jurisdictions and legal systems."
    },
    {
        question: "Is LEXRAG suitable for law firms of all sizes?",
        answer: "Yes, LEXRAG is designed to scale from solo practitioners to large law firms. Our platform offers different subscription tiers and can be customized to meet the specific needs of your practice."
    },
    {
        question: "How accurate is the information provided by LEXRAG?",
        answer: "LEXRAG provides highly accurate information by combining verified legal databases with AI analysis. Our system cross-references multiple sources and maintains transparency about the sources used for each response."
    },
    {
        question: "Can LEXRAG be integrated with existing legal software?",
        answer: "Yes, LEXRAG offers API integration capabilities and can be connected with popular legal practice management software, document management systems, and research platforms."
    },
    {
        question: "What jurisdictions does LEXRAG cover?",
        answer: "LEXRAG currently focuses on Singaporean and Asian legal systems, with plans to expand to other jurisdictions. Our technology is designed to be adaptable to different legal frameworks."
    },
    {
        question: "How does LEXRAG ensure data security and privacy?",
        answer: "We implement enterprise-grade security measures including data encryption, secure access controls, and compliance with international data protection regulations. All data processing follows strict privacy protocols."
    },
    {
        question: "What kind of support does LEXRAG provide?",
        answer: "LEXRAG offers comprehensive support including onboarding assistance, training programs, technical support, and dedicated account management for enterprise clients."
    },
    {
        question: "How can I get started with LEXRAG?",
        answer: "You can start by visiting our application at app.lexrag.com to explore the platform. We offer free trials and demos to help you understand how LEXRAG can benefit your legal practice."
    }
];

const FAQPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="Frequently Asked Questions" finalTitle="FAQ" />
                
                <section className="pb-20 px-[10%]">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Find answers to common questions about LEXRAG, our technology, and how we can help 
                            transform your legal practice.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left text-lg font-medium hover:text-blue-600 transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Still have questions? We're here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="https://app.lexrag.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Try LEXRAG
                            </a>
                            <a 
                                href="mailto:support@lexrag.com" 
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FAQPage;
