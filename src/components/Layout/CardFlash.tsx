"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import CardTable from "@/components/Layout/CardTable";

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
}

const CardFlash = ({ 
    subtitle,
    icon,
    title, 
    description, 
    imgSrcLight,
    imgSrcDark,
    link,
    LinkText = "Learn More",
    imgClassName,
    maxImgHeight,
    children 
}: CardFlashProps) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const imgSrc = resolvedTheme === "dark" ? imgSrcDark : imgSrcLight;

    return (
        <CardTable title={subtitle}>
            <tr>
                <td colSpan={5}>
                    <div className="px-7.5 py-5 lg:pr-12.5">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10">
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-2">
                                        {icon && (
                                            <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 w-9 h-9">
                                                <i className={`ki-filled ${icon} text-xl text-base`} aria-hidden="true"></i>
                                            </div>
                                        )}
                                    {title && (
                                        <h2 className="text-1.5xl font-medium text-gray-900">
                                            {title}
                                        </h2>
                                    )}
                                </div>

                                {description && Array.isArray(description) ? (
                                    description.map((paragraph, index) => (
                                        <p key={index} className="text-sm text-gray-800 text-justify leading-5.5 mb-2.5">
                                            {paragraph}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-800 leading-5.5 mb-2.5">
                                        {description}
                                    </p>
                                )}

                                {children && !!React.Children.count(children) && (
                                    <div>
                                        {children}
                                    </div>
                                )}

                                {link && (
                                    <Link href={link} className="text-primary hover:underline mt-4">
                                        {LinkText}
                                    </Link>
                                )}
                            </div>

                            {imgSrc && (
                                <img 
                                    src={imgSrc} 
                                    className={imgClassName}
                                    alt={title} 
                                    height={maxImgHeight}
                                />
                            )}
                        </div>
                    </div>
                </td>
            </tr>
        </CardTable>
    );
};

export default CardFlash;