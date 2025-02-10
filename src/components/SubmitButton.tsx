"use client"

import {useFormStatus} from "react-dom";

interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending} type="submit" className="btn btn-primary flex justify-center grow">
            {text}
        </button>
    )
}

export default SubmitButton;
