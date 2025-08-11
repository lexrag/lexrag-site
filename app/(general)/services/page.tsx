import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import PageTitle from '@/components/Layout/PageTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Database, BarChart3, FileText, Users, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Services - LEXRAG',
    description: 'Comprehensive legal data analysis and research services powered by GraphRAG technology',
};

const services = [
    {
        title: 'Legal Research & Analysis',
        description: 'Advanced legal research using graph-based data analysis and AI-powered insights',
        icon: Search,
        features: [
            'Comprehensive case law analysis',
            'Legislative document research',
            'Regulatory compliance checking',
            'Precedent identification'
        ]
    },
    {
        title: 'Graph Database Solutions',
        description: 'Custom graph database implementations for legal data management',
        icon: Database,
        features: [
            'Legal relationship mapping',
            'Data interconnection analysis',
            'Scalable graph architecture',
            'Real-time data updates'
        ]
    },
    {
        title: 'AI-Powered Legal Insights',
        description: 'Machine learning and AI solutions for legal document analysis',
        icon: BarChart3,
        features: [
            'Document classification',
            'Risk assessment',
            'Compliance monitoring',
            'Predictive analytics'
        ]
    },
    {
        title: 'Document Processing',
        description: 'Automated legal document processing and analysis',
        icon: FileText,
        features: [
            'OCR and text extraction',
            'Document structure analysis',
            'Metadata extraction',
            'Content summarization'
        ]
    },
    {
        title: 'Legal Team Collaboration',
        description: 'Collaborative tools for legal teams and organizations',
        icon: Users,
        features: [
            'Shared workspace',
            'Document sharing',
            'Team analytics',
            'Access control'
        ]
    },
    {
        title: 'Compliance & Security',
        description: 'Enterprise-grade security and compliance solutions',
        icon: Shield,
        features: [
            'Data encryption',
            'Access auditing',
            'Compliance reporting',
            'GDPR compliance'
        ]
    }
];

const ServicesPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="Our Services" finalTitle="Services" />
                
                <section className="pb-20 px-[10%]">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
                            Comprehensive Legal Technology Services
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            We provide end-to-end solutions for legal data analysis, research, and AI-powered insights 
                            using cutting-edge GraphRAG technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                            <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Ready to transform your legal practice with AI-powered insights?
                        </p>
                        <a 
                            href="https://app.lexrag.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
