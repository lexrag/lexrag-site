import Image from 'next/image';
import { cx } from '@/utils/cx';
import LiquidGlass from '../liquid-glass';

interface ICard {
    id: number;
    title: string;
    img: string;
    description: string;
}

const CARDS: ICard[] = [
    {
        id: 1,
        title: 'Ingest & Normalize',
        img: '/media/home/the-engine-1.svg',
        description: 'Documents are uploaded, normalized, and enriched with metadata.',
    },
    {
        id: 2,
        title: 'Legal Graph',
        img: '/media/home/the-engine-2.svg',
        description: 'Statutes, regulations and precedents are connected into a structured legal knowledge graph',
    },
    {
        id: 3,
        title: 'Vector Understanding',
        img: '/media/home/the-engine-3.svg',
        description: 'Embeddings capture semantic meaning, context, and relationships across legal concepts.',
    },
    {
        id: 4,
        title: 'RAG Retrieval',
        img: '/media/home/the-engine-4.svg',
        description: 'Real-time search for most relevant authoritative sources (statutes, cases, commentary).',
    },
    {
        id: 5,
        title: 'Reasoning with traces',
        img: '/media/home/the-engine-5.svg',
        description: 'Structured step-by-step argumentation, always with citations.',
    },
    {
        id: 6,
        title: 'Flexible Integrations',
        img: '/media/home/the-engine-6.svg',
        description: 'Interoperable with any LLM model, cloud or on-prem, for maximum flexibility and security.',
    },
];

function CardItem({ card, index }: { card: ICard; index: number }) {
    return (
        <div className="md:w-[31.5%] w-full h-[229px] transition-all duration-500 group cursor-pointer">
            <div className="relative w-full h-full [perspective:1000px]">
                <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                    {/* Front side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                        <LiquidGlass
                            key={card.title}
                            className="w-full h-full bg-[#e4e4fd] rounded-[24px] overflow-hidden"
                            centered={false}
                            compact
                            displacementScale={0}
                            blurAmount={1}
                            saturation={100}
                            aberrationIntensity={0}
                            elasticity={0.1}
                            cornerRadius={24}
                            mode="standard"
                        >
                            <div className="flex w-full gap-8 mb-2">
                                <span className="text-axis-indigo text-[40px]/[110%]">{index + 1}</span>
                                <Image src={card.img} className="" width={130} height={130} alt="image" />
                            </div>
                            <h5 className="text-[20px]/[110%] text-midnight-core mr-auto">{card.title}</h5>
                        </LiquidGlass>
                    </div>

                    {/* Back side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <LiquidGlass
                            className="w-full h-full bg-[#d6d7fc] rounded-[24px] overflow-hidden"
                            centered={false}
                            compact
                            displacementScale={0}
                            blurAmount={1}
                            saturation={100}
                            aberrationIntensity={0}
                            elasticity={0.1}
                            cornerRadius={24}
                            mode="standard"
                        >
                            <div className="flex items-center h-full w-full p-6">
                                <p className="text-midnight-core text-left text-[20px]/[130%]">{card.description}</p>
                            </div>
                        </LiquidGlass>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TheEngine({ className }: { className?: string }) {
    return (
        <section className={cx('', className)}>
            <h2 className="mb-4 md:mb-[55px] text-3xl md:text-5xl text-midnight-core">
                The engine behind verifiable legal AI
            </h2>

            <div className="flex md:mb-[75px] mb-8 gap-6 flex-wrap justify-center">
                {CARDS.map((card, i) => (
                    <CardItem key={card.id} card={card} index={i} />
                ))}
            </div>
        </section>
    );
}
