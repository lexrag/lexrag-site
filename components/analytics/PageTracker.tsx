'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageOncePerLocation } from '@/lib/analytics';
import { persistMarketingContextFromUrl } from '@/lib/marketing-context';

function PageTrackerInner() {
    const pathname = usePathname();
    const search = useSearchParams();

    useEffect(() => {
        // comments in code strictly in English
        // Persist marketing context synchronously for the first page view, then send page()
        persistMarketingContextFromUrl();
        pageOncePerLocation();
    }, [pathname, search]);

    return null;
}

export default function PageTracker() {
    return (
        <Suspense>
            <PageTrackerInner />
        </Suspense>
    );
}
