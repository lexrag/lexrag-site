import { PropsWithChildren } from 'react';
import Card from '@/components/Layout/Card';

const SuccessCard = ({ children }: PropsWithChildren) => {
    return (
        <Card>
            <div className="flex justify-center mb-5">
                <img
                    src="https://cdn.lexrag.com/custom_icons/light/__medal.svg"
                    className="dark:hidden max-h-[180px]"
                    alt="Action succeed!"
                />
                <img
                    src="https://cdn.lexrag.com/custom_icons/dark/__medal.svg"
                    className="light:hidden max-h-[180px]"
                    alt="Action succeed!"
                />
            </div>

            {children}
        </Card>
    );
};

export default SuccessCard;
