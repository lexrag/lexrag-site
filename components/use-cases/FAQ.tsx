'use client';

import { KeyboardEvent, useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type FaqItem = { id?: string | number; question: string; answer: string };

const DEFAULT_FAQ: FaqItem[] = [
    {
        question: 'What is a Payment Gateway?',
        answer: 'A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players. Payment gateways play a vital role in the online transaction process, which is the realisation of value, and hence are seen as an important pillar of ecommerce.',
    },
    {
        question: 'Do I need to pay when there is no transaction in my business?',
        answer: 'No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!',
    },
    {
        question: 'What platforms does ACME payment gateway support?',
        answer: 'No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!',
    },
    {
        question: 'Does ACME provide international payments support?',
        answer: 'Yes, Instapay provides support for International transactions. We support all major international cards and 92 currencies including USD, EUR, GBP, SGD, AED.',
    },
    {
        question: 'Is there any setup or annual maintenance fee that I need to pay regularly?',
        answer: 'We do not charge for the setup and annual maintainance. You only pay for the plan that you are opting to.',
    },
];

export default function FAQ({
    items = DEFAULT_FAQ,
    className = '',
    defaultIndex = 1,
}: {
    items?: FaqItem[];
    className?: string;
    defaultIndex?: number;
}) {
    const [active, setActive] = useState(Math.min(defaultIndex, items.length - 1));
    const [openMobile, setOpenMobile] = useState(Math.min(defaultIndex, items.length - 1));
    const prefersReduce = useReducedMotion();

    const onKey = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) => (i + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) => (i - 1 + items.length) % items.length);
            } else if (e.key === 'Home') {
                e.preventDefault();
                setActive(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                setActive(items.length - 1);
            }
        },
        [items.length],
    );

    return (
        <section className={`relative ${className}`}>
            <h2 className="mb-6 md:mb-10 text-[32px]/[110%] md:text-[64px]/[110%] text-midnight-core">
                Frequently Asked Questions
            </h2>

            <div className="hidden md:flex justify-end gap-6 items-start">
                <div
                    role="tablist"
                    aria-orientation="vertical"
                    onKeyDown={onKey}
                    className="bg-white overflow-hidden xl:absolute left-0 top-36 border border-black/5"
                >
                    {items.map((it, i) => (
                        <button
                            key={it.id ?? i}
                            role="tab"
                            aria-selected={active === i}
                            onClick={() => setActive(i)}
                            className={`w-full text-left flex items-center gap-4 px-6 py-6 border-b last:border-b-0 border-[#CFD0FC] transition
                ${active === i ? 'bg-[#F8F8FF]' : 'hover:bg-white/60'}`}
                        >
                            <span
                                aria-hidden
                                className={`inline-block w-5 h-5 rounded-full shrink-0 ${
                                    active === i ? 'bg-[#694AFF]' : 'bg-[#C9CCFF]'
                                }`}
                            />
                            <span className="flex-1 text-midnight-core">{it.question}</span>
                            <ChevronRight className={`${active === i ? 'text-axis-indigo' : 'text-static-lilac'}`} />
                        </button>
                    ))}
                </div>

                <div className="bg-[#F8F8FF] rounded-[16px] shadow-[0_8px_24px_rgba(17,17,50,0.08)] p-6 md:p-10 min-h-[472px] w-[648px] ml-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="xl:pl-[100px]"
                            key={active}
                            initial={prefersReduce ? {} : { opacity: 0, y: 8 }}
                            animate={prefersReduce ? {} : { opacity: 1, y: 0 }}
                            exit={prefersReduce ? {} : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <h3 className="text-xl md:text-2xl font-semibold text-midnight-core mb-4">
                                {items[active]?.question}
                            </h3>
                            <p className="text-[#2E3A6B] leading-relaxed">{items[active]?.answer}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="md:hidden">
                <ul className="divide-y divide-[#CFD0FC] rounded-[16px] bg-[#F8F8FF] shadow-[0_8px_24px_rgba(17,17,50,0.08)]">
                    {items.map((it, i) => {
                        const isOpen = openMobile === i;
                        const panelId = `faq-panel-${i}`;
                        const btnId = `faq-button-${i}`;
                        return (
                            <li key={it.id ?? i}>
                                <button
                                    id={btnId}
                                    aria-controls={panelId}
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenMobile((prev) => (prev === i ? -1 : i))}
                                    className="w-full text-left flex items-start gap-3 px-4 py-4"
                                >
                                    <span
                                        aria-hidden
                                        className={`mt-1 inline-block w-4 h-4 rounded-full shrink-0 ${
                                            isOpen ? 'bg-[#694AFF]' : 'bg-[#C9CCFF]'
                                        }`}
                                    />
                                    <span className="flex-1 text-midnight-core text-[16px]">{it.question}</span>
                                    <ChevronRight
                                        className={`mt-0.5 transition-transform ${isOpen ? 'rotate-90 text-axis-indigo' : 'rotate-0 text-static-lilac'}`}
                                        aria-hidden
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={btnId}
                                            initial={prefersReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                            animate={prefersReduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                                            exit={prefersReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22, ease: 'easeOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 pt-0">
                                                <p className="text-[#2E3A6B] leading-relaxed text-[15px]">
                                                    {it.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
