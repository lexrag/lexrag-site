'use client';

import { useEffect } from 'react';
import { useTimeOnView } from '@/hooks/use-time-on-view';

interface ContentTimeTrackerProps {
    areaId: string;
    extra?: Record<string, any>;
    minThresholdMs?: number;
    pulseIntervalMs?: number;
    autoStart?: boolean; // Whether to start tracking automatically on mount
}

/**
 * Component to automatically track time spent viewing content
 * Starts tracking on mount and stops on unmount
 */
export default function ContentTimeTracker({
    areaId,
    extra = {},
    minThresholdMs = 1000,
    pulseIntervalMs = 30000,
    autoStart = true,
}: ContentTimeTrackerProps) {
    const { start, stop } = useTimeOnView({
        areaId,
        extra,
        minThresholdMs,
        pulseIntervalMs,
    });

    useEffect(() => {
        if (autoStart) {
            start();
        }

        return () => {
            stop();
        };
    }, [start, stop, autoStart]);

    // This component doesn't render anything
    return null;
}
