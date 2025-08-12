'use client';

import { useState } from 'react';
import { getCategoryColorScheme } from '@/utils/colorMapping';
import { cn } from '@/lib/utils';
import { H4, PSM } from '@/components/ui/typography';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import '@/components/ui/css-variables.css';

interface ProductFeaturesProps {
    gridClassName?: string;
    showDescription?: boolean;
    showSideBadges?: boolean;
    showBottomBadges?: boolean;
    maxHeightBeforeShowAll?: number;
}

const ProductFeatures = ({
    gridClassName = 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5 lg:pr-[14%] lg:pl-[14%]',
    showDescription = true,
    showSideBadges = true,
    showBottomBadges = true,
    maxHeightBeforeShowAll = 500,
}: ProductFeaturesProps) => {
    const [showAll, setShowAll] = useState(false);
    const visibleFeats = combinedFeaturesData;

    return (
        <div className="relative pb-4">
            <div
                className="transition-max-height duration-500 pt-2 ease-in-out overflow-hidden"
                style={{
                    maxHeight: showAll ? 'none' : `${maxHeightBeforeShowAll}px`,
                }}
            >
                <div className={gridClassName}>
                    {visibleFeats.map((feat, index) => {
                        const colors = getCategoryColorScheme(feat.category);

                        return (
                            <a key={index} href={feat.link} className="group block">
                                <div
                                    className={cn(
                                        'relative overflow-hidden flex flex-col gap-5 p-5 lg:p-5 rounded-xl items-center justify-around',
                                        'border border-transparent shadow-md transition-all hover:shadow-lg',
                                        'bg-blue-50',
                                        colors.border,
                                    )}
                                >
                                    {/* Hover bottom border */}
                                    <div
                                        className={cn(
                                            'absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100',
                                            'transition-transform duration-500 origin-left',
                                            colors.gradient,
                                        )}
                                    />

                                    {/* Card content */}
                                    <div className="flex w-full items-center justify-between gap-4.5">
                                        <div className="flex items-start gap-4.5">
                                            <div className="relative w-[44px] h-[44px] flex items-center justify-center">
                                                <i
                                                    className={cn('ki-duotone text-2xl', colors.icon_color, feat.icon)}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <H4 className={cn('mb-px', colors.icon_color)}>{feat.title}</H4>
                                                <PSM className="text-2sm text-gray-500">{feat.subtitle}</PSM>
                                            </div>
                                        </div>

                                        {showSideBadges && (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs px-2 py-1">
                                                    {feat.category}
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs px-2 py-1">
                                                    {feat.plan}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {showDescription && <p className="text-2sm text-gray-500">{feat.description}</p>}

                                    {showBottomBadges && (
                                        <div className="flex w-full items-center justify-start gap-3">
                                            <Badge variant="secondary" className="text-xs px-2 py-1">
                                                {feat.category}
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs px-2 py-1">
                                                {feat.plan}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="text-center mt-8">
                <Button
                    className="border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] 
                    shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] backdrop-blur-[2.78px] hover:bg-primary/90
                    text-[var(--Brand-Primary-Midnight-Core)]"
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? 'Show Less' : 'Show All'}
                </Button>
            </div>
        </div>
    );
};

export default ProductFeatures;
