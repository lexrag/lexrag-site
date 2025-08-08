'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSegment } from '@/hooks/use-segment';
import { initializeSegmentAnalytics } from '@/utils/segment';

export const PageViewTracker = () => {
    const pathname = usePathname();
    const { trackPageView } = useSegment();
    const isInitialized = useRef(false);
    const lastPathname = useRef<string | null>(null);

    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            initializeSegmentAnalytics().catch((error) => {
                if (!error.message?.includes('401')) {
                    console.error('Error initializing Segment analytics:', error);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (pathname && typeof window !== 'undefined' && pathname !== lastPathname.current) {
            lastPathname.current = pathname;
            const pageTitle = document.title || 'Lexrag';
            
            trackPageView(pathname, pageTitle).catch((error) => {
                if (!error.message?.includes('401')) {
                    console.error('Error tracking page view:', error);
                }
            });
        }
    }, [pathname, trackPageView]);

    return null;
}; 