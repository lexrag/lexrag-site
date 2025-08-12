'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, identify, page, track } from '@/lib/analytics';
import { getMarketingContext } from '@/lib/marketing-context';

/**
 * Segment Provider Inner - Handles analytics initialization
 */
function SegmentProviderInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialize analytics
        const initAnalytics = async () => {
            try {
                const analytics = await getAnalytics();

                // Get marketing context from URL/storage
                const marketingContext = getMarketingContext();

                // If we have marketing parameters, identify the user
                if (marketingContext.utm_source || marketingContext.li_fat_id) {
                    const anonymousId = analytics.user().anonymousId();

                    // Identify user
                    await identify(anonymousId);

                    // Track user properties separately
                    await track('user_properties_updated', {
                        ...marketingContext,
                        source: 'marketing_site',
                        page: pathname,
                        user_id: anonymousId,
                    });
                }

                // Track page view with marketing context
                await page({
                    path: pathname,
                    url: window.location.href,
                    referrer: document.referrer,
                    user_agent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    ...marketingContext,
                });
            } catch (error) {
                console.error('Failed to initialize analytics:', error);
            }
        };

        initAnalytics();
    }, [pathname, searchParams]);

    return null;
}

/**
 * Segment Provider - Wraps inner component in Suspense
 */
export default function SegmentProvider() {
    return (
        <Suspense fallback={null}>
            <SegmentProviderInner />
        </Suspense>
    );
}
