import Image from 'next/image';

const ITEMS: {
    title: string;
    description: string;
    icon: string;
    iconActive: string;
}[] = [
    {
        title: 'Q3 2025',
        description: 'Launch & Beta testing',
        icon: '/media/about/road-map-1.svg',
        iconActive: '/media/about/road-map-1-active.svg',
    },
    {
        title: 'Q4 2025',
        description: 'Core services live in Singapore',
        icon: '/media/about/road-map-2.svg',
        iconActive: '/media/about/road-map-2-active.svg',
    },
    {
        title: 'Q1 2026',
        description: 'Premium features for Singapore practitioners',
        icon: '/media/about/road-map-3.svg',
        iconActive: '/media/about/road-map-3-active.svg',
    },
    {
        title: 'Q2 2026',
        description: 'Knowledge graph expansion to key Common Law hubs',
        icon: '/media/about/road-map-4.svg',
        iconActive: '/media/about/road-map-4-active.svg',
    },
    {
        title: 'Q3 2026',
        description: 'Commercial rollout across key Common Law markets',
        icon: '/media/about/road-map-5.svg',
        iconActive: '/media/about/road-map-5-active.svg',
    },
    {
        title: 'Q4 2026',
        description: 'Knowledge graph extension to International Law and cross-border domains',
        icon: '/media/about/road-map-6.svg',
        iconActive: '/media/about/road-map-6-active.svg',
    },
];

export function RoadMap() {
    return (
        <div className="overflow-x-scroll scrollbar-hide pb-24">
            <div className="flex flex-col h-[168px] relative">
                {ITEMS.map((item, idx) => {
                    const leftPosition = 100 + idx * 380;
                    return (
                        <div
                            key={`${item.title}${idx}`}
                            className="group absolute z-10 bottom-0 translate-y-1 flex flex-col items-center"
                            style={{ left: `${leftPosition}px` }}
                        >
                            <div className="text-[30px] text-[#A2A7BE] group-hover:text-phase-green transition-colors w-[250px] mx-auto text-center">
                                {item.title}
                            </div>
                            <div className="h-[78px] w-[1px] bg-white transition-colors group-hover:bg-phase-green"></div>
                            <div className="relative w-10 h-10 bg-[#f1f1f1] border border-white group-hover:border-phase-green transition-colors rounded-full flex items-center justify-center">
                                <Image
                                    className="absolute group-hover:opacity-0 transition-opacity"
                                    src={item.icon}
                                    width={27}
                                    height={27}
                                    alt="icon"
                                />
                                <Image
                                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
                                    src={item.iconActive}
                                    width={27}
                                    height={27}
                                    alt="icon"
                                />

                                {/* Tooltip */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                    <div className="bg-[#E6FCF1] text-midnight-core px-3 py-2 rounded-lg text-sm shadow-lg w-max">
                                        <p className="max-w-[236px] text-center text-[18px]/[120%]">
                                            {item.description}
                                        </p>

                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-8 border-r-transparent border-b-4 border-b-[#E6FCF1]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="w-[2287px] h-[1px] bg-midnight-core mt-auto mb-4"></div>
            </div>
        </div>
    );
}
