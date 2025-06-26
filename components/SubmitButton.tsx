'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit" className="flex justify-center grow">
            {text}
        </Button>
    );
};

export default SubmitButton;
