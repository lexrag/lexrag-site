import {PropsWithChildren} from "react";

const Card = ({children}: PropsWithChildren) => {
    return (
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card;