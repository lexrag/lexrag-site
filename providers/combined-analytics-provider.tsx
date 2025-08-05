'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initializeAnalytics, contentTimeTracker } from '@/utils/analytics';
import { initializeMixpanelAnalytics, mixpanelContentTimeTracker } from '@/utils/mixpanel';

interface CombinedAnalyticsContextType {
    contentTimeTracker: typeof contentTimeTracker;
    mixpanelContentTimeTracker: typeof mixpanelContentTimeTracker;
    isAnalyticsAvailable: boolean;
    isMixpanelAvailable: boolean;
}

const CombinedAnalyticsContext = createContext<CombinedAnalyticsContextType | undefined>(undefined);

interface CombinedAnalyticsProviderProps {
    children: ReactNode;
}

export const CombinedAnalyticsProvider: React.FC<CombinedAnalyticsProviderProps> = ({ children }) => {
    const [isAnalyticsAvailable, setIsAnalyticsAvailable] = React.useState(false);
    const [isMixpanelAvailable, setIsMixpanelAvailable] = React.useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeAnalytics();
            initializeMixpanelAnalytics();
            
            setIsAnalyticsAvailable(true);
            setIsMixpanelAvailable(true);
        }
    }, []);

    const value: CombinedAnalyticsContextType = {
        contentTimeTracker,
        mixpanelContentTimeTracker,
        isAnalyticsAvailable,
        isMixpanelAvailable,
    };

    return (
        <CombinedAnalyticsContext.Provider value={value}>
            {children}
        </CombinedAnalyticsContext.Provider>
    );
};

export const useCombinedAnalyticsContext = () => {
    const context = useContext(CombinedAnalyticsContext);
    if (context === undefined) {
        throw new Error('useCombinedAnalyticsContext must be used within a CombinedAnalyticsProvider');
    }
    return context;
};

export default CombinedAnalyticsProvider; 