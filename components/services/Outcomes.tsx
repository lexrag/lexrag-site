import { cx } from '@/utils/cx';

type Card = {
    title?: string;
    desc?: string;
};

const CARDS: Card[] = [
    {
        title: '70%',
        desc: 'Research speed vs. manual work',
    },
    {
        title: '500+',
        desc: 'Legal teams onboarded',
    },
    {
        title: 'Global',
        desc: 'Multi-jurisdiction support',
    },
    {
        title: '10,000+',
        desc: 'Cases cited and mapped',
    },
    {
        title: '99%',
        desc: 'Citation accuracy',
    },
    {
        title: '24/7',
        desc: 'Audit trail & traceability',
    },
];

export default function Outcomes({ className }: { className: string }) {
    return (
        <section className={cx('py-14 md:py-20', className)}>
            <div className="max-w-[1200px] mx-auto px-4">
                <h2 className="mb-8 md:mb-12 text-4xl md:text-5xl text-midnight-core">Outcomes / Value Proof</h2>

                <div className="flex xl:flex-nowrap flex-wrap gap-6">
                    <div className="flex flex-wrap flex-1 xl:gap-6 gap-3 justify-between">
                        {CARDS.map((card, idx) => {
                            return (
                                <div
                                    key={card.title}
                                    className={cx(
                                        'bg-[#FFFFFF4D] border rounded-3xl xl:h-[191px] h-[150px] flex flex-col items-center justify-center px-4',
                                        idx == 0 || idx == 4
                                            ? 'xl:w-[180px] md:w-full w-[47%]'
                                            : 'xl:w-[242px] md:w-full w-[47%]',
                                        idx == 2 || idx == 3
                                            ? 'bg-gradient-to-b to-[#06DF72] from-[#06DF7299] border-phase-green'
                                            : 'border-white',
                                    )}
                                >
                                    <h6
                                        className={cx(
                                            'font-bold xl:text-[50px] text-[24px] text-phase-green mb-6',
                                            idx === 2 || idx === 3 ? 'text-white' : '',
                                        )}
                                    >
                                        {card.title}
                                    </h6>
                                    <p className="text-midnight-core leading-4">{card.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-[#FFFFFF4D] border border-white md:px-8 px-4 rounded-3xl w-full xl:w-[384px] flex flex-col items-center justify-center p-4">
                        <h6 className={cx('font-bold text-[50px] text-phase-green mb-6')}>1,200+</h6>
                        <p className="text-midnight-core">
                            Already trusted by boutique firms, mid-size practices, and global law firms — showing
                            adoption across the full spectrum of the legal industry.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
