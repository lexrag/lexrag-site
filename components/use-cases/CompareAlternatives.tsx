'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { LinkPrimary } from '../ui/link-primary';

type Row = {
    label: string;
    lexrag: boolean;
    llm: boolean;
    vendorX: boolean;
    note: string;
};

const ROWS: Row[] = [
    {
        label: 'Traceability',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Only LEXRAG shows source-proofed answers.',
    },
    {
        label: 'Jurisdictional coverage',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Broadest coverage out-of-the-box',
    },
    {
        label: 'Hallucination risk',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Only LEXRAG shows source-proofed answers.',
    },
    {
        label: 'Custom sources',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Only LEXRAG shows source-proofed answers.',
    },
    {
        label: 'API / lock-in',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Only LEXRAG shows source-proofed answers.',
    },
    {
        label: 'Total cost',
        lexrag: true,
        llm: false,
        vendorX: false,
        note: 'Only LEXRAG shows source-proofed answers.',
    },
];

export default function CompareAlternatives({ className = '' }: { className?: string }) {
    return (
        <section className={className}>
            <h2 className="mb-8 md:mb-[55px] text-[32px]/[110%] text-midnight-core md:text-[64px]/[110%]">
                Compare to Alternatives
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div
                    className="relative -mx-4 md:mx-0"
                    role="region"
                    aria-label="Comparison table (scroll horizontally if needed)"
                >
                    <div className="overflow-x-auto px-4 md:px-0">
                        <table className="min-w-[1000px] border-separate border-spacing-0">
                            <thead>
                                <tr className="text-center text-midnight-core">
                                    <th className="py-3 pl-3 pr-4 text-[18px] font-semibold border-b border-[#CFD0FC] whitespace-nowrap w-[220px]">
                                        Criteria
                                    </th>
                                    <th className="py-3 px-4 text-[18px] font-semibold border-b border-[#CFD0FC] whitespace-nowrap w-[140px]">
                                        LEXRAG
                                    </th>
                                    <th className="py-3 px-4 text-[18px] font-semibold border-b border-[#CFD0FC] whitespace-nowrap w-[140px]">
                                        LLM-only
                                    </th>
                                    <th className="py-3 px-4 text-[18px] font-semibold border-b border-[#CFD0FC] whitespace-nowrap w-[140px]">
                                        Vendor X
                                    </th>
                                    <th className="py-3 px-4 text-[18px] font-semibold border-b border-[#CFD0FC] whitespace-nowrap w-[280px]">
                                        Criteria
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {ROWS.map((r) => (
                                    <tr key={r.label} className="text-midnight-core">
                                        <td className="py-3 pl-3 pr-4 border-b border-[#CFD0FC] text-black whitespace-nowrap">
                                            {r.label}
                                        </td>

                                        <td className="py-3 px-4 border-b border-[#CFD0FC]">
                                            <div className="flex items-center justify-center">
                                                {r.lexrag ? (
                                                    <div className="w-6 h-6 rounded-[2px] bg-phase-green flex items-center justify-center">
                                                        <Check className="text-white" size={20} />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-[2px] bg-[#FF5500] flex items-center justify-center">
                                                        <X className="text-white" size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 border-b border-[#CFD0FC]">
                                            <div className="flex justify-center items-center">
                                                {r.llm ? (
                                                    <div className="w-6 h-6 rounded-[2px] bg-phase-green flex items-center justify-center">
                                                        <Check className="text-white" size={20} />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-[2px] bg-[#FF5500] flex items-center justify-center">
                                                        <X className="text-white" size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 border-b border-[#CFD0FC]">
                                            <div className="flex justify-center items-center">
                                                {r.vendorX ? (
                                                    <div className="w-6 h-6 rounded-[2px] bg-phase-green flex items-center justify-center">
                                                        <Check className="text-white" size={20} />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-[2px] bg-[#FF5500] flex items-center justify-center">
                                                        <X className="text-white" size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="py-3 pl-4 pr-3 text-left text-black border-b border-[#CFD0FC]">
                                            <p className="w-[240px] mx-auto">{r.note}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <LinkPrimary className="w-[208px] inline-block" href="/blog">
                        Blog
                    </LinkPrimary>
                </div>
            </motion.div>
        </section>
    );
}
