'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { contentTimeTracker, initializeAnalytics } from '@/utils/analytics';
import { initializeMixpanelAnalytics, mixpanelContentTimeTracker } from '@/utils/mixpanel';

interface AnalyticsContextType {
    contentTimeTracker: typeof contentTimeTracker;
    mixpanelContentTimeTracker: typeof mixpanelContentTimeTracker;
    isAnalyticsAvailable: boolean;
    isMixpanelAvailable: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
    children: ReactNode;
    enableMixpanel?: boolean;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children, enableMixpanel = true }) => {
    const [isAnalyticsAvailable, setIsAnalyticsAvailable] = React.useState(false);
    const [isMixpanelAvailable, setIsMixpanelAvailable] = React.useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeAnalytics();
            setIsAnalyticsAvailable(true);

            if (enableMixpanel) {
                initializeMixpanelAnalytics();
                setIsMixpanelAvailable(true);
            }
        }
    }, [enableMixpanel]);

    const value: AnalyticsContextType = {
        contentTimeTracker,
        mixpanelContentTimeTracker,
        isAnalyticsAvailable,
        isMixpanelAvailable,
    };

    return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export const useAnalyticsContext = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
    }
    return context;
};

export default AnalyticsProvider;
