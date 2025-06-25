'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getBadgeColor } from '@/utils/badgeColorMapping.';
import { combinedFeaturesData } from '@/components/Features/FeaturesData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Convert title to URL-friendly format
  const toUrlFriendly = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const currentPage = pathname.split('/').filter(Boolean).pop() || '';

  // set dynamic colors by feature category
  const categoryColors = {
    search: {
      icon_color: 'text-blue-500 dark:text-blue-300',
      border: 'hover:border-blue-500 dark:hover:border-blue-300',
    },
    query: {
      icon_color: 'text-green-500 dark:text-green-300',
      border: 'hover:border-green-500 dark:hover:border-green-300',
    },
    storage: {
      icon_color: 'text-yellow-500 dark:text-yellow-300',
      border: 'hover:border-yellow-500 dark:hover:border-yellow-300',
    },
    analytics: {
      icon_color: 'text-purple-500 dark:text-purple-300',
      border: 'hover:border-purple-500 dark:hover:border-purple-300',
    },
  };

  // Filter out the current page from the features list
  const visibleFeats = combinedFeaturesData.filter(
    (feat) => feat.key !== currentPage,
  );

  return (
    <div className="relative pb-20">
      <div
        className="transition-max-height duration-500 pt-2 ease-in-out overflow-hidden"
        style={{
          maxHeight: showAll ? '2000px' : `${maxHeightBeforeShowAll}px`,
        }}
      >
        <div className={gridClassName}>
          {visibleFeats.map((feat, index) => {
            const colors = categoryColors[feat.category] || {
              icon_color: 'dark:text-gray-300 light:text-gray-700',
              border: 'dark:border-gray-300 light:border-gray-400',
            };

            return (
              <a
                key={index}
                href={feat.link}
                className="transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div
                  className={`dark:bg-coal-300 light:bg-white border-[1px] ${colors.border} flex flex-col gap-5 p-5 lg:p-5 rounded-xl relative items-center justify-around shadow-md hover:shadow-lg transition-shadow`}
                >
                  <div className="flex w-full items-center justify-between gap-4.5">
                    <div className="flex items-start gap-4.5">
                      <div className="relative w-[44px] h-[44px] flex items-center justify-center border-[1px] light:bg-gray-200 rounded-full aspect-square">
                        <i
                          className={`ki-duotone text-2xl ${colors.icon_color} ${feat.icon}`}
                        ></i>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-md font-medium ${colors.icon_color} mb-px`}
                        >
                          {feat.title}
                        </span>
                        <span className="text-2sm dark:text-gray-700 light:text-gray-500">
                          {feat.subtitle}
                        </span>
                      </div>
                    </div>

                    {showSideBadges && (
                      <div className="flex flex-col items-start gap-3">
                        <Badge
                          appearance="outline"
                          variant={getBadgeColor(feat.category)}
                        >
                          {feat.category}
                        </Badge>

                        <Badge
                          appearance="outline"
                          variant={getBadgeColor(feat.category)}
                        >
                          {feat.plan}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {showDescription && (
                    <p className="text-2sm dark:text-gray-700 light:text-gray-600">
                      {feat.description}
                    </p>
                  )}

                  {showBottomBadges && (
                    <div className="flex w-full items-center justify-start gap-3">
                      <Badge
                        appearance="outline"
                        variant={getBadgeColor(feat.category)}
                      >
                        {feat.category}
                      </Badge>

                      <Badge
                        appearance="outline"
                        variant={getBadgeColor(feat.category)}
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
        <div className="text-center mt-8">
          <Button
            onClick={toggleShowAll}
            className="transition-all duration-300"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFeatures;
