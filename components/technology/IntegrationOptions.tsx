import Image from 'next/image';
import Link from 'next/link';

export default function IntegrationOptions({ className = '' }: { className: string }) {
    return (
        <section className={`${className}`}>
            <h2 className="text-midnight-core text-[32px] md:text-[64px]/[110%] mb-5 md:mb-[52px]">
                Integration Options
            </h2>

            <div className="flex gap-[25px] flex-wrap md:flex-nowrap">
                <div className="flex flex-col w-[384px] rounded-[24px] items-center bg-[#BBBCFA] pt-[36px] pb-[28px] px-2">
                    <Image
                        className="md:w-[211px] md:h-[181px] w-[124px] h-[120px]"
                        src="/media/technology/integration-options-1.svg"
                        alt="image"
                        width={211}
                        height={181}
                    />
                    <span className="text-axis-indigo text-md md:text-xl font-medium mt-auto">API/MCP-centric</span>
                </div>

                <div className="flex flex-col w-[384px] rounded-[24px] items-center bg-[#BBBCFA] pt-[36px] pb-[28px] px-2">
                    <Image
                        className="md:w-[211px] md:h-[181px] w-[124px] h-[120px]"
                        src="/media/technology/integration-options-2.svg"
                        alt="image"
                        width={211}
                        height={181}
                    />
                    <span className="text-axis-indigo text-md md:text-xl font-medium mt-auto">CRM/DMS/KMS plugins</span>
                </div>

                <div className="flex flex-col w-[384px] rounded-[24px] items-center bg-[#BBBCFA] pt-[36px] pb-[28px] px-2">
                    <Image
                        className="md:w-[211px] md:h-[181px] w-[124px] h-[120px]"
                        src="/media/technology/integration-options-3.svg"
                        alt="image"
                        width={215}
                        height={181}
                    />
                    <span className="text-axis-indigo text-md md:text-xl font-medium mt-auto">Standalone platform</span>
                </div>
            </div>

            <div className="text-center mt-[52px]">
                <Link
                    className="text-axis-indigo bg-phase-green font-medium text-base py-2 px-[36px] rounded-full transition-colors hover:opacity-85"
                    href="/technology"
                >
                    Explore Integration Guide
                </Link>
            </div>
        </section>
    );
}
