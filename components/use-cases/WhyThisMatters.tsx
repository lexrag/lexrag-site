import Image from 'next/image';
import Link from 'next/link';
import { CircleCheck, CircleX } from 'lucide-react';
import { LinkPrimary } from '../ui/link-primary';

export default function WhyThisMatter({ className }: { className?: string }) {
    return (
        <section className={`${className}`}>
            <h2 className="text-midnight-core text-[32px] md:text-[64px]/[110%] mb-5 md:mb-[52px]">Why this matters</h2>

            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 mb-[45px]">
                <div className="flex md:gap-6 gap-2">
                    <div className="flex items-center justify-center md:w-45 md:h-45 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFEFE559] to-[#FF5C00]">
                        <Image
                            className="md:translate-x-3 md:translate-y-2 translate-x-1.5 translate-y-1.5 md:w-[140px] md:h-[140px] w-[40px] h-[40px]"
                            src="/media/use-case/why-this-matters-2.svg"
                            width={140}
                            height={140}
                            alt="image"
                        />
                    </div>
                    <div className="bg-[#FFEFE5] md:px-[30px] px-2 py-3 md:py-[42px] rounded-3xl">
                        <h6 className="mb-[17px] text-base text-midnight-core">Problem</h6>
                        <ul className="flex flex-col gap-[14px]">
                            <li className="flex gap-[10px]">
                                <CircleX size={18} className="text-[#FF5C00] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    Reviews take too much time and delay case progress.
                                </span>
                            </li>
                            <li className="flex gap-[10px]">
                                <CircleX size={18} className="text-[#FF5C00] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    High risk of missing compliance gaps or critical citations.
                                </span>
                            </li>
                            <li className="flex gap-[10px]">
                                <CircleX size={18} className="text-[#FF5C00] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    Rising costs from manual, repetitive review work.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex md:gap-6 gap-2">
                    <div className="flex items-center justify-center md:w-45 md:h-45 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6FCF1] to-phase-green">
                        <Image
                            className="translate-x-2 md:translate-x-4  translate-y-2 md:translate-y-3 md:w-[140px] md:h-[140px] w-[40px] h-[40px]"
                            src="/media/use-case/why-this-matters-1.svg"
                            width={140}
                            height={140}
                            alt="image"
                        />
                    </div>
                    <div className="bg-[#E6FCF1] md:px-[30px] px-2 py-3 md:py-[42px] rounded-3xl">
                        <h6 className="mb-[17px] text-base text-midnight-core">Problem</h6>
                        <ul className="flex flex-col gap-[14px]">
                            <li className="flex gap-[10px]">
                                <CircleCheck size={18} className="text-[#06DF72] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    Reviews take too much time and delay case progress.
                                </span>
                            </li>
                            <li className="flex gap-[10px]">
                                <CircleCheck size={18} className="text-[#06DF72] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    High risk of missing compliance gaps or critical citations.
                                </span>
                            </li>
                            <li className="flex gap-[10px]">
                                <CircleCheck size={18} className="text-[#06DF72] mt-1" />
                                <span className="max-w-[256px] md:text-base text-[14px] text-midnight-core">
                                    Rising costs from manual, repetitive review work.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-static-lilac rounded-3xl md:rounded-full py-[18px] flex flex-col md:flex-row items-center justify-around mt-[54px mb-[45px] gap-3">
                <Link href="/use-cases" className="hover:opacity-75 transition-opacity underline md:no-underline">
                    #Legal Accuracy
                </Link>
                <Link href="/use-cases" className="hover:opacity-75 transition-opacity underline md:no-underline">
                    #Explainable AI
                </Link>
                <Link href="/use-cases" className="hover:opacity-75 transition-opacity underline md:no-underline">
                    #Case Assessment
                </Link>
                <Link href="/use-cases" className="hover:opacity-75 transition-opacity underline md:no-underline">
                    #Neighbor Services
                </Link>
            </div>

            <div className="text-center">
                <LinkPrimary className="inline-block w-[208px]" href="/blog">
                    Blog
                </LinkPrimary>
            </div>
        </section>
    );
}
