import { useCallback, useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

interface UseTimeOnViewOptions {
    areaId: string;
    extra?: Record<string, any>;
    minThresholdMs?: number; // Minimum time to track (default: 3000ms)
    pulseIntervalMs?: number; // How often to send "pulse" events (default: 60000ms)
    finalMinThresholdMs?: number; // Minimum time required to send final event (default: same as minThresholdMs)
    disablePulses?: boolean; // Disable periodic pulses (default: from env or false)
    sampleOneOutOf?: number; // Sample pulses: send for 1 out of N sessions (default: from env or 1)
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
    minThresholdMs = 3000,
    pulseIntervalMs = 60000,
    finalMinThresholdMs,
    disablePulses,
    sampleOneOutOf,
}: UseTimeOnViewOptions): TimeOnViewControls {
    // Read client-side env flags
    const ENV_DISABLE_PULSES =
        typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_DISABLE_PULSES === 'true';
    const rawSample =
        (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_SAMPLE_CONTENT_PULSES) || '1';
    const ENV_SAMPLE_ONE_OUT_OF = Number.parseInt(rawSample, 10);

    const startTimeRef = useRef<number | null>(null);
    const totalTimeRef = useRef<number>(0);
    const isPausedRef = useRef<boolean>(false);
    const pulseTimerRef = useRef<NodeJS.Timeout | null>(null);
    const lastPulseTimeRef = useRef<number>(0);
    const hasFlushedFinalRef = useRef<boolean>(false);
    const isSampledRef = useRef<boolean>(true);

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
                    // Only send pulse if sampled and pulses are enabled
                    if (isSampledRef.current) {
                        sendTimeSpentEvent(elapsed, false);
                    }
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
        // Decide sampling for this session (pulses only)
        const oneOutOf = Number.isFinite(sampleOneOutOf || NaN)
            ? (sampleOneOutOf as number)
            : Number.isFinite(ENV_SAMPLE_ONE_OUT_OF) && ENV_SAMPLE_ONE_OUT_OF > 0
              ? ENV_SAMPLE_ONE_OUT_OF
              : 1;
        isSampledRef.current = oneOutOf <= 1 ? true : Math.random() < 1 / oneOutOf;

        // Respect disable flag (prop takes precedence over env)
        const pulsesDisabled = typeof disablePulses === 'boolean' ? disablePulses : ENV_DISABLE_PULSES;
        if (!pulsesDisabled) {
            startPulseTimer();
        }
    }, [startPulseTimer, sampleOneOutOf, ENV_SAMPLE_ONE_OUT_OF, disablePulses, ENV_DISABLE_PULSES]);

    const stop = useCallback(() => {
        if (!startTimeRef.current) return;

        const endTime = Date.now();
        const spentMs = endTime - startTimeRef.current + totalTimeRef.current;

        // Send final event once per session and mark flushed
        if (!hasFlushedFinalRef.current) {
            const minFinal = typeof finalMinThresholdMs === 'number' ? finalMinThresholdMs : minThresholdMs;
            if (spentMs >= (minFinal || 0)) {
                sendTimeSpentEvent(spentMs, true);
                hasFlushedFinalRef.current = true;
            }
        }

        // Cleanup
        if (pulseTimerRef.current) {
            clearInterval(pulseTimerRef.current);
            pulseTimerRef.current = null;
        }

        startTimeRef.current = null;
        totalTimeRef.current = 0;
        lastPulseTimeRef.current = 0;
    }, [sendTimeSpentEvent, finalMinThresholdMs, minThresholdMs]);

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

    // Reliable final flush on pagehide/visibilitychange using sendBeacon
    useEffect(() => {
        const buildPayload = () => {
            if (!startTimeRef.current) return null;
            const endTime = Date.now();
            const spentMs = endTime - startTimeRef.current + totalTimeRef.current;
            const minFinal = typeof finalMinThresholdMs === 'number' ? finalMinThresholdMs : minThresholdMs;
            if (spentMs < (minFinal || 0)) return null;
            return {
                event: 'content_time_spent',
                properties: {
                    area_id: areaId,
                    spent_ms: spentMs,
                    is_final: true,
                    ...extra,
                },
            };
        };

        const flushFinal = () => {
            if (hasFlushedFinalRef.current) return;
            const payload = buildPayload();
            if (!payload) return;
            try {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                // comments in code strictly in English
                // Server endpoint should forward to Segment and/or handle appropriately
                navigator.sendBeacon('/api/analytics/beacon', blob);
                hasFlushedFinalRef.current = true;
            } catch {
                // Fallback: fire-and-forget request with keepalive
                try {
                    fetch('/api/analytics/beacon', {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        keepalive: true,
                        headers: { 'Content-Type': 'application/json' },
                    });
                    hasFlushedFinalRef.current = true;
                } catch {
                    // Intentionally ignore errors
                }
            }
        };

        const onPageHide = () => flushFinal();
        const onVisibilityChange = () => {
            if (document.visibilityState === 'hidden') flushFinal();
        };

        window.addEventListener('pagehide', onPageHide);
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.removeEventListener('pagehide', onPageHide);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [areaId, extra, minThresholdMs, finalMinThresholdMs]);
    useEffect(() => {
        return () => {
            if (startTimeRef.current) {
                stop();
            }
        };
    }, [stop]);

    return { start, stop, pause, resume };
}
