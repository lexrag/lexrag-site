'use client';

import { useEffect, useState } from 'react';
import { getCategoryColorScheme } from '@/utils/colorMapping';
import { cn } from '@/lib/utils';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import LiquidGlass from '../liquid-glass';
import { Badge } from '../ui/badge';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);
    return matches;
};

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
    const isMobile = useMediaQuery('(max-width: 768px)');
    const visibleFeats = combinedFeaturesData;

    const toggleShowAll = () => setShowAll(!showAll);

    const expandedHeight = isMobile ? '4000px' : '2000px';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative pb-4">
            <div
                className="transition-max-height duration-500 pt-2 ease-in-out overflow-hidden"
                style={{
                    maxHeight: showAll ? expandedHeight : `${maxHeightBeforeShowAll}px`,
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
                                        'dark:bg-coal-300 bg-white',
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
                                            <div className="relative w-[44px] h-[44px] flex items-center justify-center border border-stream-blue light:bg-gray-200 rounded-full aspect-square">
                                                <i className={cn('ki-duotone text-2xl text-stream-blue', feat.icon)} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn('text-md font-medium mb-px text-stream-blue')}>
                                                    {feat.title}
                                                </span>
                                                <span className="text-2sm dark:text-gray-400 light:text-gray-500">
                                                    {feat.subtitle}
                                                </span>
                                            </div>
                                        </div>

                                        {showSideBadges && (
                                            <div className="flex flex-col items-end gap-2">
                                                <Badge
                                                    variant="primary"
                                                    appearance={'outline'}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    {feat.category}
                                                </Badge>
                                                <Badge
                                                    variant="primary"
                                                    appearance={'outline'}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    {feat.plan}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {showDescription && <p className="text-2sm text-gray-500">{feat.description}</p>}

                                    {showBottomBadges && (
                                        <div className="flex w-full items-center justify-start gap-3">
                                            <Badge
                                                variant="primary"
                                                appearance={'outline'}
                                                className="text-xs px-2 py-1"
                                            >
                                                {feat.category}
                                            </Badge>
                                            <Badge
                                                variant="primary"
                                                appearance={'outline'}
                                                className="text-xs px-2 py-1"
                                            >
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
            {visibleFeats.length > 0 && (
                <div className="flex justify-center text-center mt-8">
                    <LiquidGlass
                        className="group transition-all duration-200 hover:scale-105"
                        centered={false}
                        compact
                        displacementScale={50}
                        blurAmount={0.01}
                        saturation={130}
                        aberrationIntensity={2}
                        elasticity={0.05}
                        cornerRadius={100}
                        mode="standard"
                        padding="8px 16px"
                        onClick={toggleShowAll}
                    >
                        <span
                            className="block text-axis-indigo group-hover:text-emerald-500 
                    text-base font-medium px-2 whitespace-nowrap transition-colors duration-200"
                        >
                            {showAll ? 'Show Less' : 'Show All'}
                        </span>
                    </LiquidGlass>
                </div>
            )}
        </div>
    );
};

export default ProductFeatures;
