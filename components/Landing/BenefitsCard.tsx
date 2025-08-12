import BoxScaledIcon from '../icons/BoxScaledIcon';
import CheckmarkIcon from '../icons/CheckMarkIcon';
import ClockIcon from '../icons/ClockIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import { H4, PBase } from '../ui/typography';

type BenefitsCardProps = {
    item: { img: string; title: string; description: string };
};

const BenefitsCard = ({ item }: BenefitsCardProps) => {
    const getIcon = (iconName: string) => {
        if (iconName === 'medal') {
            return (
                <>
                    <div className="hidden md:block">
                        <CheckmarkIcon />
                    </div>
                    <img src="/media/images/medal.svg" className="md:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }

        if (iconName === 'clock') {
            return (
                <>
                    <div className="hidden md:block">
                        <ClockIcon />
                    </div>
                    <img src="/media/images/clock.svg" className="md:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }

        if (iconName === 'magnifying-glass') {
            return (
                <>
                    <div className="hidden md:block">
                        <MagnifyingGlassIcon />
                    </div>
                    <img
                        src="/media/images/magnifying-glass.svg"
                        className="md:hidden max-h-24 mb-4"
                        alt={`${item.title}`}
                    />
                </>
            );
        }

        if (iconName === 'box-scaled') {
            return (
                <>
                    <div className="hidden md:block">
                        <BoxScaledIcon />
                    </div>
                    <img src="/media/images/box-scaled.svg" className="md:hidden max-h-24 mb-4" alt={`${item.title}`} />
                </>
            );
        }

        // Default fallback for any other icon names
        return <img src={`/media/images/${iconName}.svg`} className="max-h-24 mb-4" alt={`${item.title}`} />;
    };

    return (
        <div className="group relative flex flex-col items-center justify-center text-center rounded-[30px] overflow-hidden h-full min-h-[300px] p-6">
            <div className="absolute inset-0 bg-[rgba(23,36,92,0.12)] backdrop-blur-md group-hover:backdrop-blur-3xl shadow-[0_0_25px_0_rgba(0,0,0,0.12)] z-0 transition-all duration-300" />

            <div className="relative z-10 flex flex-col items-center h-full justify-between">
                {getIcon(item.img)}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center mb-3">
                        <H4 className="text-white text-lg">{item.title}</H4>
                    </div>
                    <PBase className="text-white max-w-[90%] text-sm leading-relaxed">{item.description}</PBase>
                </div>
            </div>
        </div>
    );
};

export default BenefitsCard;
