'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getBadgeColor, getCategoryColorScheme } from '@/utils/colorMapping';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

// type FeatureCategory = 'search' | 'query' | 'storage' | 'analytics';

// interface FeatureData {
//     key: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     icon: string;
//     link: string;
//     category: FeatureCategory | string;
//     plan: string;
// }

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
    const pathname = usePathname();

    const toggleShowAll = () => setShowAll(!showAll);

    const currentPage = pathname.split('/').filter(Boolean).pop() || '';
    const visibleFeats = combinedFeaturesData.filter((feat) => feat.key !== currentPage);

    return (
        <div className="relative pb-4">
            <div
                className="transition-max-height duration-500 pt-2 ease-in-out overflow-hidden"
                style={{
                    maxHeight: showAll ? '2000px' : `${maxHeightBeforeShowAll}px`,
                }}
            >
                <div className={gridClassName}>
                    {visibleFeats.map((feat, index) => {
                        const colors = getCategoryColorScheme(feat.category);

                        return (
                            <motion.a
                                key={index}
                                href={feat.link}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="group block"
                            >
                                <div
                                    className={cn(
                                        'relative overflow-hidden flex flex-col gap-5 p-5 lg:p-5 rounded-xl items-center justify-around',
                                        'border border-transparent shadow-md transition-all hover:shadow-lg',
                                        'dark:bg-coal-300 light:bg-white',
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
                                            <div className="relative w-[44px] h-[44px] flex items-center justify-center border-[1px] light:bg-gray-200 rounded-full aspect-square">
                                                <i
                                                    className={cn('ki-duotone text-2xl', colors.icon_color, feat.icon)}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn('text-md font-medium mb-px', colors.icon_color)}>
                                                    {feat.title}
                                                </span>
                                                <span className="text-2sm dark:text-gray-400 light:text-gray-500">
                                                    {feat.subtitle}
                                                </span>
                                            </div>
                                        </div>

                                        {showSideBadges && (
                                            <div className="flex flex-col items-start gap-3">
                                                <Badge appearance="outline" variant={getBadgeColor(feat.category)}>
                                                    {feat.category}
                                                </Badge>
                                                <Badge appearance="outline" variant={getBadgeColor(feat.category)}>
                                                    {feat.plan}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {showDescription && (
                                        <p className="text-2sm dark:text-gray-400 light:text-gray-500">
                                            {feat.description}
                                        </p>
                                    )}

                                    {showBottomBadges && (
                                        <div className="flex w-full items-center justify-start gap-3">
                                            <Badge appearance="outline" variant={getBadgeColor(feat.category)}>
                                                {feat.category}
                                            </Badge>
                                            <Badge appearance="outline" variant={getBadgeColor(feat.category)}>
                                                {feat.plan}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            {visibleFeats.length > 0 && (
                <div className="text-center mt-8">
                    <Button onClick={toggleShowAll} className="transition-all duration-300">
                        {showAll ? 'Show Less' : 'Show All'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductFeatures;
