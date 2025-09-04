import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';

const LIST: string[] = ['Legal Research', 'Case Assessment', 'Document Review', 'Synthetic Panel'];

export default function ExploreAllServices({ className }: { className: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto mb-6">
                Explore all services
            </h2>

            <div className="flex justify-between">
                <div className="flex flex-col gap-2 flex-1 max-w-[600px]">
                    {LIST.map((item: string) => {
                        return (
                            <div key={item} className="w-full">
                                <Link
                                    href={'/services'}
                                    className={cx(
                                        'group relative isolate flex w-full items-center gap-5 rounded-2xl p-4 pl-6 text-left',
                                        'bg-white/70 hover:bg-white cursor-pointer',
                                        'transition-[transform,box-shadow] duration-300 ease-out will-change-transform',
                                        'hover:shadow-md',
                                        'before:absolute before:inset-0 before:-z-10 before:rounded-2xl',
                                        'before:bg-gradient-to-b before:from-[#907bf6] before:to-[#694AFF]',
                                        'before:opacity-0 before:transition-opacity before:duration-300 before:ease-out',
                                        'hover:before:opacity-100',
                                    )}
                                >
                                    <span
                                        className={cx(
                                            'relative z-10 font-medium transition-colors duration-300',
                                            'text-base md:text-xl',
                                            'text-midnight-core group-hover:text-white',
                                        )}
                                    >
                                        {item}
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <Image
                    className="hidden md:block"
                    src="/media/service/explore-1.svg"
                    width={350}
                    height={350}
                    alt="explore"
                />
            </div>
        </section>
    );
}
