'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from '@/lib/analytics-events';

/**
 * Tracks scroll depth on pages for analytics
 */
export default function ScrollTracker() {
    const pathname = usePathname();
    const scrollRef = useRef<number>(0);
    const lastTrackedDepth = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollDepth = Math.round((scrollTop / docHeight) * 100);

            // Track at 25%, 50%, 75%, and 100% scroll depths
            const trackingPoints = [25, 50, 75, 100];

            trackingPoints.forEach((point) => {
                if (scrollDepth >= point && lastTrackedDepth.current < point) {
                    trackScrollDepth(pathname, point, {
                        scroll_position: scrollTop,
                        document_height: docHeight,
                        window_height: window.innerHeight,
                    });
                    lastTrackedDepth.current = point;
                }
            });
        };

        // Reset tracking when page changes
        lastTrackedDepth.current = 0;
        scrollRef.current = 0;

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return null;
}
