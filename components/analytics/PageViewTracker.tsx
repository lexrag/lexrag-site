'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';

export const PageViewTracker = () => {
    const pathname = usePathname();
    const { trackPageView, trackSessionStart } = useAnalytics();

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