'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initializeAnalytics, contentTimeTracker } from '@/utils/analytics';

interface AnalyticsContextType {
    contentTimeTracker: typeof contentTimeTracker;
    isAnalyticsAvailable: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
    children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
    const [isAnalyticsAvailable, setIsAnalyticsAvailable] = React.useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeAnalytics();
            setIsAnalyticsAvailable(true);
        }
    }, []);

    const value: AnalyticsContextType = {
        contentTimeTracker,
        isAnalyticsAvailable,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalyticsContext = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
    }
    return context;
};

export default AnalyticsProvider; 