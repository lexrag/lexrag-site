'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/Header/Logo';
import { WordRotate } from '@/components/magicui/word-rotate';
import { H4 } from '@/components/ui/typography';
import '@/components/ui/css-variables.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const links = {
        product: [
            { label: 'Features', href: '/features' },
            { label: 'Services', href: '/services' },
            { label: 'Technology', href: '/technology/graphrag' },
            { label: 'Use Cases', href: '/use-cases' },
        ],
        legal: [
            { label: 'Terms & Conditions', href: '/terms-and-conditions/terms-conditions' },
            { label: 'Privacy Policy', href: '/terms-and-conditions/privacy-policy' },
            { label: 'Cookie Policy', href: '/terms-and-conditions/cookie-policy' },
            { label: 'Refund Policy', href: '/terms-and-conditions/refund-cancellation' },
        ],
    };

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/company/lexrag/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:info@lexrag.com', label: 'Email' },
    ];

    return (
        <footer className="bg-[var(--Brand-Primary-Axis-Indigo)] relative overflow-hidden px-[10%]">
            <div className="container px-6 mx-auto pt-14 pb-6 border-b border-border/50">
                <div className="flex flex-col lg:flex-row justify-between items-start">
                    {/* Logo and description - Left side */}
                    <div className="lg:w-1/3 mb-12 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-3">
                                <Logo variant='white' />
                            </div>
                            <div className="italic font-medium text-white mb-4">
                                <WordRotate
                                    as="span"
                                    words={['Structure the law', 'Retrieve with purpose', 'Answer with confidence']}
                                />
                            </div>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="size-9 border bg-white border-border/60 text-[var(--Brand-Primary-Axis-Indigo)] rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="size-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 2 Column Menu - Right aligned */}
                    <div className="w-full grow lg:w-auto lg:grow-0 lg:w-2/3 flex justify-end">
                        <div className="w-full lg:w-auto flex justify-between flex-wrap lg:grid lg:grid-cols-2 gap-8 lg:gap-16">
                            {Object.entries(links).map(([category, items], categoryIndex) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <H4 className="font-medium mb-4 capitalize text-white">
                                        {category}
                                    </H4>
                                    <ul className="text-base space-y-2">
                                        {items.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-white hover:text-emerald-500"
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-6 bg-border/50" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex order-2 md:order-1 gap-2 font-normal">
                        <span className="text-white">© {currentYear}</span>
                        <span className="text-white">
                            LEXRAG PTE. LTD. All rights reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
