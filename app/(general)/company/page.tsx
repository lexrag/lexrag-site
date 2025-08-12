import { Metadata } from 'next';
import { Award, Eye, Globe, Target, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import PageTitle from '@/components/Layout/PageTitle';

export const metadata: Metadata = {
    title: 'Company - LEXRAG',
    description: 'Learn about LEXRAG, our mission, vision, and commitment to revolutionizing legal technology',
};

const CompanyPage = () => {
    return (
        <div className="overflow-y-auto">
            <Header className="" />

            <main className="pt-20">
                <PageTitle title="About Our Company" finalTitle="Company" />

                <section className="pb-20 px-[10%]">
                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-8 w-8 text-blue-600" />
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Mission</h2>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                To revolutionize legal research and analysis by leveraging cutting-edge GraphRAG
                                technology, making complex legal information accessible, understandable, and actionable
                                for legal professionals worldwide.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Vision</h2>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                To become the global leader in AI-powered legal technology, transforming how legal
                                professionals access, analyze, and utilize legal information through innovative
                                graph-based solutions.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
                            Our Core Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle>Innovation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        We continuously push the boundaries of what's possible in legal technology,
                                        embracing new approaches and cutting-edge solutions.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="mx-auto p-3 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <CardTitle>User-Centric</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Every feature and solution is designed with legal professionals in mind,
                                        ensuring maximum value and usability.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle>Global Impact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        We're committed to making legal technology accessible to professionals across
                                        different jurisdictions and legal systems.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <CardTitle>Excellence</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        We maintain the highest standards of quality in our technology, support, and
                                        customer experience.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Technology Focus */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
                            Powered by GraphRAG Technology
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                            Our proprietary GraphRAG technology combines the power of graph databases with
                            retrieval-augmented generation, creating a revolutionary approach to legal data analysis.
                        </p>
                        <a
                            href="/technology/graphrag"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Learn More About Our Technology
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CompanyPage;
