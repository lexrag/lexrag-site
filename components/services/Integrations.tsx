import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';

export default function Intergrations({ className }: { className: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto mb-6">
                Integrations / Add-on Moduless
            </h2>
            <p className="max-w-[792px] text-midnight-core font-medium text-[20px]/[21px] md:text-[28px]/[31px]">
                Expand your workflow with seamless add-ons and integrations.
            </p>
            <div className="flex justify-center md:justify-between mt-8 md:mt-[50px]">
                <div className="bg-axis-indigo rounded-3xl w-full md:w-[588px] py-8 md:py-[68px] flex flex-col items-center px-3">
                    <h6 className="text-[24px]/[110%] font-medium mb-6">Synthetic Panel</h6>
                    <ul className="flex flex-col gap-1">
                        <li className="md:w-[384px] w-full border-b border-white">Role Selection</li>
                        <li className="md:w-[384px] w-full border-b border-white">Custom Agent Profiles</li>
                        <li className="md:w-[384px] w-full border-b border-white">User as Moderator</li>
                        <li className="md:w-[384px] w-full border-b border-white">Shared Legal Knowledge Base</li>
                        <li className="md:w-[384px] w-full border-b border-white">Agent Subgraphs</li>
                    </ul>
                </div>

                <div className="md:block hidden">
                    <Image src="/media/service/integration.svg" width={378} height={326} alt="image" />
                </div>
            </div>

            <div className="text-center">
                <Link
                    className="inline-block mx-auto mt-[50px] text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-opacity hover:opacity-85"
                    href="/services"
                >
                    Explore Synthetic Panel
                </Link>
            </div>
        </section>
    );
}
