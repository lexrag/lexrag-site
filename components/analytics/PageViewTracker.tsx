'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCombinedAnalytics } from '@/hooks/use-combined-analytics';

export const PageViewTracker = () => {
    const pathname = usePathname();
    const { trackPageView, trackSessionStart } = useCombinedAnalytics();

    useEffect(() => {
        trackSessionStart();
    }, []);

    useEffect(() => {
        if (pathname) {
            const pageTitle = document.title || 'Lexrag';
            trackPageView(pathname, pageTitle);
        }
    }, [pathname, trackPageView]);

    return null;
}; 