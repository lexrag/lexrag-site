import { useState } from 'react';
import BoxScaledIcon from '../icons/BoxScaledIcon';
import CheckmarkIcon from '../icons/CheckMarkIcon';
import ClockIcon from '../icons/ClockIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import LiquidGlass from '../liquid-glass';
import { H4, PBase } from '../ui/typography';

type BenefitsCardProps = {
    item: { img: string; title: string; description: string };
};

const BenefitsCard = ({ item }: BenefitsCardProps) => {
    const getIcon = (iconName: string) => {
        if (iconName === 'medal') {
            return (
                <>
                    <div className="hidden lg:block">
                        <CheckmarkIcon />
                    </div>
                    <img src="/media/images/medal.svg" className="lg:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }

        if (iconName === 'clock') {
            return (
                <>
                    <div className="hidden lg:block">
                        <ClockIcon />
                    </div>
                    <img src="/media/images/clock.svg" className="lg:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }

        if (iconName === 'magnifying-glass') {
            return (
                <>
                    <div className="hidden lg:block">
                        <MagnifyingGlassIcon />
                    </div>
                    <img
                        src="/media/images/magnifying-glass.svg"
                        className="lg:hidden max-h-24 mb-4"
                        alt={`${item.title}`}
                    />
                </>
            );
        }

        if (iconName === 'box-scaled') {
            return (
                <>
                    <div className="hidden lg:block">
                        <BoxScaledIcon />
                    </div>
                    <img src="/media/images/box-scaled.svg" className="lg:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }
        return <img src={`/media/images/${iconName}.svg`} className="max-h-24 mb-4" alt={`${item.title}`} />;
    };
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative h-full">
            <div className="absolute inset-0 z-9 bg-[rgba(23,36,92,0.08)] pointer-events-none rounded-[50px]"></div>
            <div className="hidden md:block h-full">
                <LiquidGlass
                    className="group transition-all duration-300 h-full shadow-none z-10 relative"
                    centered={false}
                    compact
                    displacementScale={30}
                    blurAmount={0.00005}
                    saturation={50}
                    aberrationIntensity={0}
                    elasticity={0}
                    cornerRadius={50}
                    mode="standard"
                    padding="0px 0px"
                    overLight={isHovered}
                >
                    <div
                        className="group relative flex flex-col items-center justify-center text-center rounded-[30px] overflow-hidden h-full min-h-[350px] p-6"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <style>{`
                    .glass__warp:hover {
                        blur(100px)
                    }

                    .group:hover .box-faces {
                        fill: #B25BDE !important;
                    }
                    .group:hover .hoverable-element {
                        fill: rgba(255, 255, 255, 0.3) !important;
                        stroke: rgba(255, 255, 255, 0.9) !important;
                    }
                    .group:hover .glow-effect {
                        filter: drop-shadow(0 0 25px rgba(105,74,255,255)) drop-shadow(0 0 50px rgba(89, 62, 220, 0.4)) !important;
                    }
                    .group:hover .inside-circle {
                        fill: #694aff !important;
                        fill-opacity: 1 !important;
                    }
                    .group:hover .checkmark {
                        stroke: #ffffff !important;
                        filter: drop-shadow(0 0 10px rgba(105,74,255,255)) !important;
                    }
                    .group:hover .clock-hand {
                        stroke: #05df71 !important;
                        filter: drop-shadow(0 0 10px rgba(5, 223, 113, 0.8)) drop-shadow(0 0 20px rgba(5, 223, 113, 0.6)) !important;
                    }
                    .group:hover .ellipse-purple {
                        fill: #B25BDE !important;
                    }
                    .group:hover .ellipse-green {
                        fill: #05df71 !important;
                    }
                    .group:hover .ellipse-blue {
                        fill: #694aff !important;
                    }
                `}</style>
                        <div className="relative z-10 flex flex-col items-center h-full">
                            <div className="transition-transform duration-300">{getIcon(item.img)}</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center items-center mb-3">
                                    <H4 className="text-white text-lg text-left">{item.title}</H4>
                                </div>
                                <PBase className="text-white max-w-[90%] text-sm leading-relaxed text-left">
                                    {item.description}
                                </PBase>
                            </div>
                        </div>
                    </div>
                </LiquidGlass>
            </div>
            <div className="md:hidden">
                <div
                    className="group transition-all duration-300 h-full shadow-none z-10 relative backdrop-blur-md bg-white/10 rounded-[50px] border border-white/20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="group relative flex flex-col items-center justify-center text-center rounded-[30px] overflow-hidden h-full min-h-[350px] p-6">
                        <div className="relative z-10 flex flex-col items-center h-full justify-between">
                            <div className="transition-transform duration-300">{getIcon(item.img)}</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-center items-center mb-3">
                                    <H4 className="text-white text-lg text-left">{item.title}</H4>
                                </div>
                                <PBase className="text-white max-w-[90%] text-sm leading-relaxed text-left">
                                    {item.description}
                                </PBase>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsCard;
