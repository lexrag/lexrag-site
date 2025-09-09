import { cx } from '@/utils/cx';

type Card = {
    title?: string;
    desc?: string;
};

const CARDS: Card[] = [
    {
        title: '8h → 15min',
        desc: 'Legal research with LEXRAG',
    },
    {
        title: '3× Faster',
        desc: 'From black-box AI to transparent, verifiable reasoning',
    },
    {
        title: '100 %',
        desc: 'Answers backed by authoritative citation',
    },
    {
        title: '70% Stronger',
        desc: 'Smarter research → stronger arguments',
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
                                        idx == 1 || idx == 2 ? 'md:w-[304px] w-full' : 'md:flex-1 w-full',
                                        idx == 1 || idx == 2
                                            ? 'bg-gradient-to-b to-[#06DF72] from-[#06DF7299] border-phase-green'
                                            : 'border-white',
                                    )}
                                >
                                    <h6
                                        className={cx(
                                            'font-extrabold xl:text-[50px] text-[34px] text-phase-green mb-2 md:mb-6',
                                            idx === 1 || idx === 2 ? 'text-white' : '',
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
                        <h6 className={cx('font-bold md:text-[50px] text-[32px] text-phase-green mb-6')}>By lawyers</h6>
                        <p className="text-midnight-core">Built for lawyers’ workflows</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
