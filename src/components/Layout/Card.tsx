import {PropsWithChildren} from "react";

const Card = ({children}: PropsWithChildren) => {
    return (
        <div className="card">
            <div className="card-body flex flex-col gap-1 max-w-[300px] sm:max-w-[500px]">
                {children}
            </div>
        </div>
    )
}

export default Card;
