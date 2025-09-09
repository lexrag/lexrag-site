import Image from 'next/image';
import { cx } from '@/utils/cx';

interface ICard {
    id: number;
    title: string;
    img: string;
    description: string;
}

const CARDS: ICard[] = [
    {
        id: 1,
        title: 'Legal Research',
        img: '/media/home/overview-1.svg',
        description: 'Documents are uploaded, normalized, and enriched with metadata.',
    },
    {
        id: 2,
        title: 'Document Review',
        img: '/media/home/overview-2.svg',
        description: '10x faster reviews → zero blind spots',
    },
    {
        id: 3,
        title: 'Case Assessment',
        img: '/media/home/overview-3.svg',
        description: 'From intake to strategy in minutes',
    },
    {
        id: 4,
        title: 'Synthetic Panel',
        img: '/media/home/overview-4.svg',
        description: 'Instant second opinions from AI experts',
    },
];

function CardItem({ card }: { card: ICard; index: number }) {
    return (
        <div className="flex flex-col flex-1 hover:flex-1/6 transition-all bg-gradient-to-br to-[#694AFF] from-[#BBBCFA] p-6 h-[380px] duration-500">
            <div className="h-40 mb-10">
                <Image className="mb-10" src={card.img} width={120} height={120} alt="icon" />
            </div>
            <h5 className="text-[28px]/[110%] text-white font-medium mb-1.5">{card.title}</h5>
            <p className="text-[18px]/[110%]">{card.description}</p>
        </div>
    );
}

export default function ServicesOverview({ className }: { className?: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core">Services overview</h2>

            <div className="flex md:flex-nowrap flex-wrap gap-2">
                {CARDS.map((card, i) => (
                    <CardItem key={card.id} card={card} index={i} />
                ))}
            </div>
        </section>
    );
}
