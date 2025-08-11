'use client';

import { useEffect } from 'react';
import { useTimeOnView } from '@/hooks/use-time-on-view';

interface ContentTimeTrackerProps {
    areaId: string;
    extra?: Record<string, any>;
    minThresholdMs?: number;
    pulseIntervalMs?: number;
    finalMinThresholdMs?: number;
    disablePulses?: boolean;
    sampleOneOutOf?: number;
    autoStart?: boolean; // Whether to start tracking automatically on mount
}

/**
 * Component to automatically track time spent viewing content
 * Starts tracking on mount and stops on unmount
 */
export default function ContentTimeTracker({
    areaId,
    extra = {},
    minThresholdMs = 3000,
    pulseIntervalMs = 60000,
    finalMinThresholdMs,
    disablePulses,
    sampleOneOutOf,
    autoStart = true,
}: ContentTimeTrackerProps) {
    const { start, stop } = useTimeOnView({
        areaId,
        extra,
        minThresholdMs,
        pulseIntervalMs,
        finalMinThresholdMs,
        disablePulses,
        sampleOneOutOf,
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
