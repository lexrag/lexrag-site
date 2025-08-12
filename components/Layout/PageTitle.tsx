'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';

interface PageTitleProps {
    title?: string;
    finalTitle?: string;
    className?: string;
    children?: React.ReactNode;
}

const PageTitle = ({ title, finalTitle, className }: PageTitleProps) => {
    const pathname = usePathname();
    // Split the URL into segments
    const pathSegments = pathname.split('/').filter(Boolean);

    // Compute default title from the last segment of the URL
    const defaultTitle =
        pathSegments.length > 0
            ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
            : 'Home';

    // Use provided title or fallback to computed title
    const headerTitle = title || defaultTitle;
    // Use provided finalTitle for the last breadcrumb or fallback to computed title
    const breadcrumbFinalTitle = finalTitle || defaultTitle;

    return (
        <div className={`w-full pl-[5%] pr-[5%] ${className}`}>
            <Separator />

            <div className="flex items-center justify-between flex-wrap px-5 gap-2 la:gap-5 my-5">
                <div className="flex flex-col gap-1">
                    {/* Header title using title prop or default */}
                    <h1 className="font-medium text-lg capitalize">{headerTitle}</h1>

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1 text-2sm">
                        <Link href="/" className="text-gray-700 hover:text-primary">
                            Home
                        </Link>
                        {pathSegments.map((segment, index) => {
                            const href = '/' + pathSegments.slice(0, index + 1).join('/');
                            // For the last segment, use finalTitle if provided
                            const segmentText =
                                index === pathSegments.length - 1 ? breadcrumbFinalTitle : segment.replace(/-/g, ' ');
                            return (
                                <div key={href} className="flex items-center">
                                    <span className="text-gray-400 text-sm mx-1">/</span>
                                    <Link href={href} className="text-gray-700 hover:text-primary capitalize">
                                        {segmentText}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Separator className="mb-5 lg:mb-7.5" />
        </div>
    );
};

export default PageTitle;
