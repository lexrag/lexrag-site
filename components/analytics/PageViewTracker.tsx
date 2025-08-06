'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSegment } from '@/hooks/use-segment';

export const PageViewTracker = () => {
    const pathname = usePathname();
    const { trackPageView, trackSessionStart } = useSegment();

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