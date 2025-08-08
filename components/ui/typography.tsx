import React from 'react';
import { cn } from '@/lib/utils';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingProps = {
    variant: HeadingVariant;
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    style?: React.CSSProperties;
};

type ParagraphVariant = 'xl' | 'lg' | 'base' | 'sm';
type ParagraphProps = {
    variant: ParagraphVariant;
    children: React.ReactNode;
    className?: string;
    as?: 'p' | 'span' | 'div';
    style?: React.CSSProperties;
};

const headingStyles = {
    h1: 'text-[96px] md:text-[56px] sm:text-[48px] font-normal leading-[110%] md:leading-[110%] sm:leading-[120%] tracking-[0]',
    h2: 'text-[64px] md:text-[48px] sm:text-[32px] font-normal leading-[110%] md:leading-[110%] sm:leading-[120%] tracking-[0]',
    h3: 'text-[36px] md:text-[36px] sm:text-[24px] font-medium leading-[110%] md:leading-[110%] sm:leading-[120%] tracking-[0]',
    h4: 'text-[24px] md:text-[24px] sm:text-[20px] font-semibold leading-[110%] md:leading-[110%] sm:leading-[120%] tracking-[0]',
};

const paragraphStyles = {
    xl: 'text-[36px] md:text-[24px] sm:text-[20px] font-normal leading-[120%] md:leading-[120%] sm:leading-[130%] tracking-[0] mb-6 md:mb-6 sm:mb-6',
    lg: 'text-[26px] md:text-[26px] sm:text-[16px] font-normal leading-[130%] md:leading-[130%] sm:leading-[130%] tracking-[0] mb-3 md:mb-3 sm:mb-3',
    base: 'text-[16px] md:text-[16px] sm:text-[14px] font-normal leading-[130%] md:leading-[130%] sm:leading-[130%] tracking-[0] mb-1 md:mb-1 sm:mb-1',
    sm: 'text-[12px] md:text-[12px] sm:text-[12px] font-normal leading-[130%] md:leading-[130%] sm:leading-[130%] tracking-[0]',
};

export const Heading: React.FC<HeadingProps> = ({ 
    variant, 
    children, 
    className,
    as,
    style
}) => {
    const Component = as || variant;
    const baseStyles = 'font-instrument-sans';
    const variantStyles = headingStyles[variant];
    
    return (
        <Component className={cn(baseStyles, variantStyles, className)} style={style}>
            {children}
        </Component>
    );
};

export const Paragraph: React.FC<ParagraphProps> = ({ 
    variant, 
    children, 
    className,
    as = 'p',
    style
}) => {
    const Component = as;
    const baseStyles = 'font-instrument-sans';
    const variantStyles = paragraphStyles[variant];
    
    return (
        <Component className={cn(baseStyles, variantStyles, className)} style={style}>
            {children}
        </Component>
    );
};

export const H1: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
    <Heading variant="h1" {...props} />
);

export const H2: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
    <Heading variant="h2" {...props} />
);

export const H3: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
    <Heading variant="h3" {...props} />
);

export const H4: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
    <Heading variant="h4" {...props} />
);

export const PXL: React.FC<Omit<ParagraphProps, 'variant'>> = (props) => (
    <Paragraph variant="xl" {...props} />
);

export const PLG: React.FC<Omit<ParagraphProps, 'variant'>> = (props) => (
    <Paragraph variant="lg" {...props} />
);

export const PBase: React.FC<Omit<ParagraphProps, 'variant'>> = (props) => (
    <Paragraph variant="base" {...props} />
);

export const PSM: React.FC<Omit<ParagraphProps, 'variant'>> = (props) => (
    <Paragraph variant="sm" {...props} />
);

export type { HeadingProps, ParagraphProps, HeadingVariant, ParagraphVariant }; 