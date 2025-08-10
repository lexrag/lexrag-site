'use client';

import { useMarketingBootstrap } from '@/hooks/use-marketing-bootstrap';

/**
 * Component to bootstrap marketing context from URL parameters
 * Automatically runs once on mount to capture UTM and LinkedIn parameters
 * This component doesn't render anything visible
 */
export default function MarketingBootstrap() {
    useMarketingBootstrap();

    // This component doesn't render anything
    return null;
}
