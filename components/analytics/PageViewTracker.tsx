'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSegment } from '@/hooks/use-segment';
import { initializeSegmentAnalytics } from '@/utils/segment';

export const PageViewTracker = () => {
    const pathname = usePathname();
    const { trackPageView, trackSessionStart } = useSegment();

    useEffect(() => {
        initializeSegmentAnalytics();
    }, []);

    useEffect(() => {
        if (pathname && typeof window !== 'undefined') {
            const pageTitle = document.title || 'Lexrag';
            trackPageView(pathname, pageTitle);
        }
    }, [pathname, trackPageView]);

    return null;
}; 