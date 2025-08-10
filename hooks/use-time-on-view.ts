import { useCallback, useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

interface UseTimeOnViewOptions {
    areaId: string;
    extra?: Record<string, any>;
    minThresholdMs?: number; // Minimum time to track (default: 1000ms)
    pulseIntervalMs?: number; // How often to send "pulse" events (default: 30000ms)
}

interface TimeOnViewControls {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
}

/**
 * Hook to track time spent viewing content
 * Automatically handles visibility changes, page unload, and periodic pulses
 */
export function useTimeOnView({
    areaId,
    extra = {},
    minThresholdMs = 1000,
    pulseIntervalMs = 30000,
}: UseTimeOnViewOptions): TimeOnViewControls {
    const startTimeRef = useRef<number | null>(null);
    const totalTimeRef = useRef<number>(0);
    const isPausedRef = useRef<boolean>(false);
    const pulseTimerRef = useRef<NodeJS.Timeout | null>(null);
    const lastPulseTimeRef = useRef<number>(0);

    const sendTimeSpentEvent = useCallback(
        (spentMs: number, isFinal: boolean = false) => {
            if (spentMs < minThresholdMs) return;

            track('content_time_spent', {
                area_id: areaId,
                spent_ms: spentMs,
                is_final: isFinal,
                ...extra,
            });
        },
        [areaId, extra, minThresholdMs],
    );

    const startPulseTimer = useCallback(() => {
        if (pulseTimerRef.current) {
            clearInterval(pulseTimerRef.current);
        }

        pulseTimerRef.current = setInterval(() => {
            if (startTimeRef.current && !isPausedRef.current) {
                const now = Date.now();
                const elapsed = now - startTimeRef.current + totalTimeRef.current;

                if (elapsed - lastPulseTimeRef.current >= pulseIntervalMs) {
                    sendTimeSpentEvent(elapsed, false);
                    lastPulseTimeRef.current = elapsed;
                }
            }
        }, pulseIntervalMs);
    }, [pulseIntervalMs, sendTimeSpentEvent]);

    const start = useCallback(() => {
        if (startTimeRef.current) return; // Already started

        startTimeRef.current = Date.now();
        lastPulseTimeRef.current = 0;
        isPausedRef.current = false;
        startPulseTimer();
    }, [startPulseTimer]);

    const stop = useCallback(() => {
        if (!startTimeRef.current) return;

        const endTime = Date.now();
        const spentMs = endTime - startTimeRef.current + totalTimeRef.current;

        // Send final event
        sendTimeSpentEvent(spentMs, true);

        // Cleanup
        if (pulseTimerRef.current) {
            clearInterval(pulseTimerRef.current);
            pulseTimerRef.current = null;
        }

        startTimeRef.current = null;
        totalTimeRef.current = 0;
        lastPulseTimeRef.current = 0;
    }, [sendTimeSpentEvent]);

    const pause = useCallback(() => {
        if (!startTimeRef.current || isPausedRef.current) return;

        const pauseTime = Date.now();
        totalTimeRef.current += pauseTime - startTimeRef.current;
        startTimeRef.current = null;
        isPausedRef.current = true;

        // Pause pulse timer
        if (pulseTimerRef.current) {
            clearInterval(pulseTimerRef.current);
            pulseTimerRef.current = null;
        }
    }, []);

    const resume = useCallback(() => {
        if (startTimeRef.current || !isPausedRef.current) return;

        startTimeRef.current = Date.now();
        isPausedRef.current = false;
        startPulseTimer();
    }, [startPulseTimer]);

    // Handle visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                pause();
            } else {
                resume();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [pause, resume]);

    // Handle page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (startTimeRef.current) {
                const endTime = Date.now();
                const spentMs = endTime - startTimeRef.current + totalTimeRef.current;
                sendTimeSpentEvent(spentMs, true);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [sendTimeSpentEvent]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (startTimeRef.current) {
                stop();
            }
        };
    }, [stop]);

    return { start, stop, pause, resume };
}
