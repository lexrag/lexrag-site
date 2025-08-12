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
        switch (iconName) {
            case 'medal':
                return <CheckmarkIcon />;
            case 'clock':
                return <ClockIcon />;
            case 'magnifying-glass':
                return <MagnifyingGlassIcon />;
            case 'box-scaled':
                return <BoxScaledIcon />;
            default:
                return <img src={`/media/images/${iconName}.svg`} className="max-h-24 mb-4" alt={`${item.title}`} />;
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center text-center rounded-[30px] overflow-hidden h-full min-h-[300px] p-6">
            <div className="absolute inset-0 bg-[rgba(23,36,92,0.12)] backdrop-blur-md shadow-[0_0_25px_0_rgba(0,0,0,0.12)] z-0" />

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
