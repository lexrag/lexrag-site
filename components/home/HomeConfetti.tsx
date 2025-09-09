'use client';

import React, { useRef } from 'react';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import { cn } from '@/lib/utils';

type HomeConfettiProps = React.ComponentProps<'div'> & {
    children?: React.ReactNode;
};

const HomeConfetti = ({ children, className, ...rest }: HomeConfettiProps) => {
    const confettiRef = useRef<ConfettiRef>(null);

    return (
        <div className={cn('relative', className)} {...rest}>
            {children}
            <Confetti
                ref={confettiRef}
                className="pointer-events-none absolute inset-0 z-0"
            />
        </div>
    );
};

export default HomeConfetti;


