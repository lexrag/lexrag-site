'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';

interface CardFlashProps extends PropsWithChildren {
    subtitle?: string;
    icon?: string;
    title?: string;
    description?: string | string[];
    imgSrcLight?: string;
    imgSrcDark?: string;
    imgClassName?: string;
    link?: string;
    LinkText?: string;
    maxImgHeight?: number;
    className?: string;
}

const CardFlash = ({
    icon,
    title,
    description,
    imgSrcLight,
    imgSrcDark,
    link,
    LinkText = 'Learn More',
    imgClassName,
    maxImgHeight,
    className,
    children,
}: CardFlashProps) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const imgSrc = resolvedTheme === 'dark' ? imgSrcDark : imgSrcLight;

    return (
        <Card className={cn('w-full max-w-5xl mx-auto bg-white border-cloud-tint', className)}>
            <CardHeader className="py-4 border-cloud-tint">
                <CardHeading className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        {icon && (
                            <div className="flex items-center justify-center rounded-full border border-phase-green w-9 h-9">
                                <i className={`ki-filled ${icon} text-xl text-phase-green`} aria-hidden="true"></i>
                            </div>
                        )}
                    </div>
                    <CardTitle className="text-xl font-semibold text-midnight-core">{title}</CardTitle>
                </CardHeading>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-6 md:gap-10 px-7">
                <div className={cn('flex flex-col gap-3', !!imgSrc ? 'md:w-2/3' : 'w-full')}>
                    {description && Array.isArray(description) ? (
                        description.map((paragraph, index) => (
                            <p key={index} className="text-sm text-muted-foreground text-justify leading-relaxed">
                                {paragraph}
                            </p>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    )}

                    {children && React.Children.count(children) > 0 && <div className="mt-2">{children}</div>}
                </div>

                {imgSrc && (
                    <div className="md:w-1/3 flex justify-center items-start">
                        <img
                            src={imgSrc}
                            alt={title}
                            className={cn('object-contain', imgClassName)}
                            style={maxImgHeight ? { maxHeight: maxImgHeight } : undefined}
                        />
                    </div>
                )}
            </CardContent>

            {link && (
                <CardFooter className="justify-start px-4">
                    <Button asChild mode="link" underlined="dashed">
                        <Link href={link}>{LinkText}</Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default CardFlash;
