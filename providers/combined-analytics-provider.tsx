'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { contentTimeTracker, initializeAnalytics } from '@/utils/analytics';
import { initializeSegment, segmentContentTimeTracker } from '@/utils/segment';

interface CombinedAnalyticsContextType {
    contentTimeTracker: typeof contentTimeTracker;
    segmentContentTimeTracker: typeof segmentContentTimeTracker;
    isAnalyticsAvailable: boolean;
    isSegmentAvailable: boolean;
}

const CombinedAnalyticsContext = createContext<CombinedAnalyticsContextType | undefined>(undefined);

interface CombinedAnalyticsProviderProps {
    children: ReactNode;
}

export const CombinedAnalyticsProvider: React.FC<CombinedAnalyticsProviderProps> = ({ children }) => {
    const [isAnalyticsAvailable, setIsAnalyticsAvailable] = React.useState(false);
    const [isSegmentAvailable, setIsSegmentAvailable] = React.useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeAnalytics();
            initializeSegment();

            setIsAnalyticsAvailable(true);
            setIsSegmentAvailable(true);
        }
    }, []);

    const value: CombinedAnalyticsContextType = {
        contentTimeTracker,
        segmentContentTimeTracker,
        isAnalyticsAvailable,
        isSegmentAvailable,
    };

    return <CombinedAnalyticsContext.Provider value={value}>{children}</CombinedAnalyticsContext.Provider>;
};

export const useCombinedAnalyticsContext = () => {
    const context = useContext(CombinedAnalyticsContext);
    if (context === undefined) {
        throw new Error('useCombinedAnalyticsContext must be used within a CombinedAnalyticsProvider');
    }
    return context;
};

export default CombinedAnalyticsProvider;
