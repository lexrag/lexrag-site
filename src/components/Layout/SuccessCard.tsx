import Card from "@/components/Layout/Card";
import {PropsWithChildren} from "react";

const SuccessCard = ({children}: PropsWithChildren) => {
    return (
        <Card>
            <div className="flex justify-center mb-5">
                <img src="#" className="dark:hidden max-h-[180px]" alt="Action succeed!"/>
                <img src="#" className="light:hidden max-h-[180px]" alt="Action succeed!"/>
            </div>

            {children}
        </Card>
    )
}

export default SuccessCard;
