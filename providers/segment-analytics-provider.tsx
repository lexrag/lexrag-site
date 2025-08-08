'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { initializeSegment, segmentContentTimeTracker } from '@/utils/segment';

interface SegmentAnalyticsContextType {
    segmentContentTimeTracker: typeof segmentContentTimeTracker;
    isSegmentAvailable: boolean;
    isAnalyticsAvailable: boolean;
    contentTimeTracker: typeof segmentContentTimeTracker;
}

const SegmentAnalyticsContext = createContext<SegmentAnalyticsContextType | undefined>(undefined);

interface SegmentAnalyticsProviderProps {
    children: ReactNode;
}

export const SegmentAnalyticsProvider: React.FC<SegmentAnalyticsProviderProps> = ({ children }) => {
    const [isSegmentAvailable, setIsSegmentAvailable] = React.useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeSegment();
            setIsSegmentAvailable(true);
        }
    }, []);

    const value: SegmentAnalyticsContextType = {
        segmentContentTimeTracker,
        isSegmentAvailable,
        // Для совместимости с удаленными провайдерами
        isAnalyticsAvailable: isSegmentAvailable,
        contentTimeTracker: segmentContentTimeTracker,
    };

    return <SegmentAnalyticsContext.Provider value={value}>{children}</SegmentAnalyticsContext.Provider>;
};

export const useSegmentAnalyticsContext = () => {
    const context = useContext(SegmentAnalyticsContext);
    if (context === undefined) {
        throw new Error('useSegmentAnalyticsContext must be used within a SegmentAnalyticsProvider');
    }
    return context;
};

export default SegmentAnalyticsProvider; 