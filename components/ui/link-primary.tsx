import { ReactNode } from 'react';
import Link from 'next/link';
import { cx } from '@/utils/cx';

type LinkPrimary = 'outline' | 'primary';

export const LinkPrimary = ({
    href,
    children,
    className,
    variant = 'primary',
}: {
    href: string;
    children: ReactNode;
    className?: string;
    variant?: LinkPrimary;
}) => {
    return (
        <Link
            className={cx(
                'font-medium text-base py-2 px-[36px] rounded-full transition-all',
                variant === 'primary' && 'bg-phase-green text-axis-indigo hover:opacity-85',
                variant === 'outline' && 'border border-phase-green text-axis-indigo hover:bg-phase-green',
                className,
            )}
            href={href}
        >
            {children}
        </Link>
    );
};
