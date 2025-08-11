import { H4, PBase } from '../ui/typography';

type BenefitsCardProps = {
    item: { img: string; title: string; description: string };
};

const BenefitsCard = ({ item }: BenefitsCardProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center text-center rounded-[30px] overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(23,36,92,0.12)] backdrop-blur-md shadow-[0_0_25px_0_rgba(0,0,0,0.12)] z-0" />

            <div className="relative z-10 flex flex-col items-center">
                <img
                    src={`/media/images/${item.img}.svg`}
                    className="max-h-32 mb-6"
                    alt={`${item.title}`}
                />

                <div className="flex justify-center items-center mb-4">
                    <H4 className="text-white">{item.title}</H4>
                </div>
                <PBase className="text-white max-w-[80%]">{item.description}</PBase>
            </div>
        </div>
    );
};

export default BenefitsCard;
