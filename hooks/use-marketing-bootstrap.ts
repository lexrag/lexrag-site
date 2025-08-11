import { useEffect } from 'react';
import { persistMarketingContextFromUrl } from '@/lib/marketing-context';

/**
 * Hook to bootstrap marketing context from URL parameters
 * Automatically runs once on mount to capture UTM and LinkedIn parameters
 */
export function useMarketingBootstrap() {
    useEffect(() => {
        // Only run once on mount
        persistMarketingContextFromUrl();
    }, []); // Empty dependency array ensures it only runs once
}
