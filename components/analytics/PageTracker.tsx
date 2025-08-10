'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { page } from '@/lib/analytics';

function PageTrackerInner() {
    const pathname = usePathname();
    const search = useSearchParams();

    useEffect(() => {
        page();
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
