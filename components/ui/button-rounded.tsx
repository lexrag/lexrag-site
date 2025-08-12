import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva('cursor-pointer rounded-full text-base font-medium transition-all duration-300', {
    variants: {
        variant: {
            primary:
                'text-axis-indigo! py-2 px-10 bg-white/7 shadow-[0_0_8.88px_0_rgba(0,0,0,0.1)] hover:bg-phase-green! hover:border-transparent backdrop-blur-[8.88px] border-t border-[#fff]',
        },
    },

    defaultVariants: {
        variant: 'primary',
    },
});

function ButtonRounded({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            data-slot="button"
            className={cn(
                buttonVariants({
                    variant,

                    className,
                }),
                asChild && props.disabled && 'pointer-events-none opacity-50',
            )}
            {...props}
        />
    );
}

interface ButtonArrowProps extends React.SVGProps<SVGSVGElement> {
    icon?: LucideIcon; // Allows passing any Lucide icon
}

function ButtonArrow({ icon: Icon = ChevronDown, className, ...props }: ButtonArrowProps) {
    return <Icon data-slot="button-arrow" className={cn('ms-auto -me-1', className)} {...props} />;
}

export { ButtonRounded, ButtonArrow, buttonVariants };
