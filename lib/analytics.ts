import { AnalyticsBrowser } from '@segment/analytics-next';
import type {
    ContentCopiedProps,
    ConversationLoadedProps,
    DownloadInitiatedProps,
    ErrorOccurredProps,
    FeatureUsedProps,
    FileUploadedProps,
    GraphFilterProps,
    GraphViewChangeProps,
    GraphZoomProps,
    HelpRequestedProps,
    MessageCopiedProps,
    NodeClickProps,
    NodeExpansionProps,
    OnboardingCompletedProps,
    PreferenceChangedProps,
    QuestionSubmittedProps,
    SearchPerformedProps,
    ShareActionProps,
    SubscriptionCancelledProps,
    TutorialStepProps,
} from './analytics-types';
import { getMarketingContext } from './marketing-context';

// comments in code strictly in English
// Strengthened env gating: require explicit enable flag and write key presence
const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
const SEGMENT_ENABLED = process.env.NEXT_PUBLIC_SEGMENT_ENABLED === 'true' && !!SEGMENT_WRITE_KEY;
const SEGMENT_DEBUG = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SEGMENT_DEBUG === 'true';
const VIA_BEACON = process.env.NEXT_PUBLIC_ANALYTICS_VIA_BEACON === 'true';
// comments in code strictly in English
// FE identify gating: default off in all environments unless explicitly enabled
const FE_IDENTIFY_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_IDENTITY_FRONTEND === 'true';

// Sampling with clamp and debug log
const rawSample = parseInt(process.env.NEXT_PUBLIC_ANALYTICS_SAMPLE_VIEW_CHANGED || '1', 10);
const SAMPLE_VIEW_CHANGED = Number.isFinite(rawSample) && rawSample > 0 ? rawSample : 1;
if (SEGMENT_DEBUG) {
    console.log('Sampling rate for view_changed:', SAMPLE_VIEW_CHANGED);
}

let analyticsSingleton: any = null;
let currentUserId: string | null = null; // Track current user state
let isOnlineListenerAttached = false;

const OFFLINE_QUEUE_KEY = '__analytics_offline_queue__';
const OFFLINE_QUEUE_MAX = 100;

type QueuedEvent = {
    event: string;
    properties: Record<string, any>;
    id?: string;
};

function readOfflineQueue(): QueuedEvent[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
        return raw ? (JSON.parse(raw) as QueuedEvent[]) : [];
    } catch {
        return [];
    }
}

function writeOfflineQueue(items: QueuedEvent[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(items));
    } catch {
        // ignore
    }
}

function eventId(item: QueuedEvent): string {
    // cheap id: event + stable JSON
    try {
        return `${item.event}:${JSON.stringify(item.properties)}`;
    } catch {
        return `${item.event}`;
    }
}

function enqueueOffline(event: string, properties: Record<string, any>): void {
    const items = readOfflineQueue();
    const entry: QueuedEvent = { event, properties };
    entry.id = eventId(entry);
    if (items.some((x) => x.id === entry.id)) return; // dedupe
    items.push(entry);
    // enforce hard cap, drop oldest
    if (items.length > OFFLINE_QUEUE_MAX) items.splice(0, items.length - OFFLINE_QUEUE_MAX);
    writeOfflineQueue(items);
}

async function flushOfflineQueue(client: any): Promise<void> {
    const items = readOfflineQueue();
    if (!items.length) return;
    const remaining: QueuedEvent[] = [];
    for (const item of items) {
        try {
            await client.track(item.event, item.properties);
        } catch {
            remaining.push(item);
        }
    }
    writeOfflineQueue(remaining);
}

export function getAnalytics(): any {
    if (!SEGMENT_ENABLED || !SEGMENT_WRITE_KEY) {
        // Return mock analytics when disabled
        return Promise.resolve([
            {
                page: () => Promise.resolve(),
                track: () => Promise.resolve(),
                identify: () => Promise.resolve(),
                reset: () => Promise.resolve(),
                user: () => ({ anonymousId: () => 'anonymous' }),
            },
        ]);
    }

    if (!analyticsSingleton) {
        analyticsSingleton = AnalyticsBrowser.load({
            writeKey: SEGMENT_WRITE_KEY,
        });
        // Attach online listener once to flush the offline queue
        if (typeof window !== 'undefined' && !isOnlineListenerAttached) {
            isOnlineListenerAttached = true;
            window.addEventListener('online', async () => {
                try {
                    const [client] = await analyticsSingleton;
                    await flushOfflineQueue(client);
                } catch {
                    // ignore
                }
            });
        }
    }
    return analyticsSingleton;
}

function getAnonymousUserId(): string {
    return 'anonymous';
}

export function getCurrentUserId(): string {
    return currentUserId || getAnonymousUserId();
}

export async function page(props?: Record<string, any>) {
    // When routing via backend beacon, let the backend own page() semantics.
    if (VIA_BEACON) return;
    if (!SEGMENT_ENABLED) return;

    const [a] = await getAnalytics();
    const marketing = getMarketingContext();
    const payload = {
        ...(props || {}),
        marketing,
        meta: { ...((props || {}).meta || {}), source: 'frontend' },
        ...(SEGMENT_DEBUG && { debug_mode: true }),
    };
    await a.page(undefined, payload);

    if (SEGMENT_DEBUG) {
        console.log('📄 Page tracked:', { userId: getCurrentUserId(), properties: payload });
    }
}

// comments in code strictly in English
// Guard to avoid duplicate page() in dev/StrictMode for the same location
let lastPageKey: string | null = null;
export async function pageOncePerLocation(props?: Record<string, any>) {
    if (!SEGMENT_ENABLED) return;
    if (typeof window !== 'undefined') {
        const { pathname, search } = window.location;
        const key = `${pathname}?${search || ''}`;
        if (process.env.NODE_ENV !== 'production' && lastPageKey === key) {
            if (SEGMENT_DEBUG) console.log('🔁 Skipping duplicate page() for same location in dev:', key);
            return;
        }
        lastPageKey = key;
    }

    return page(props);
}

export async function identify(userId: string) {
    if (!SEGMENT_ENABLED) return;
    // Prefer backend alias+identify. Make this a no-op unless explicitly enabled.
    if (!FE_IDENTIFY_ENABLED) {
        if (SEGMENT_DEBUG) {
            console.log('ℹ️ Frontend identify is disabled. Backend handles alias+identify.');
        }
        currentUserId = userId; // keep local state to reduce redundant calls
        return;
    }

    if (currentUserId === userId) {
        if (SEGMENT_DEBUG) {
            console.log('🔄 Skipping identify - same userId:', userId);
        }
        return;
    }

    const [a] = await getAnalytics();
    currentUserId = userId;
    await a.identify(userId);

    if (SEGMENT_DEBUG) {
        console.log('👤 User identified:', userId);
    }
}

/**
 * Frontend alias to link anonymousId to a known userId
 */
export async function alias(userId: string) {
    if (!SEGMENT_ENABLED) return;
    if (!FE_IDENTIFY_ENABLED) {
        if (SEGMENT_DEBUG) console.log('ℹ️ Frontend alias is disabled.');
        return;
    }
    const [a] = await getAnalytics();
    try {
        await a.alias(userId);
        if (SEGMENT_DEBUG) console.log('🔗 Alias sent (frontend):', { userId });
    } catch (e) {
        console.warn('Failed to send alias (frontend):', e);
    }
}

/**
 * Expose anonymousId for identity handoff to backend
 */
export async function getAnonymousId(): Promise<string> {
    const [a] = await getAnalytics();
    try {
        return a.user().anonymousId();
    } catch {
        return 'anonymous';
    }
}

export async function analyticsReset() {
    if (!SEGMENT_ENABLED) return;

    const [client] = await getAnalytics();
    const previousUserId = currentUserId;
    currentUserId = null;
    await client.reset();

    console.log(`🔄 Analytics reset: ${previousUserId} → anonymous`);
}

/**
 * Convert event name to snake_case
 */
function toSnakeCase(event: string): string {
    return event.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

/**
 * Sanitize properties to remove sensitive data
 */
function sanitizeProps(props?: Record<string, any>): Record<string, any> {
    if (!props) return {};

    const sensitiveKeys = ['email', 'password', 'token', 'authorization', 'secret', 'key', 'user_id', 'userId'];

    const sanitizeValue = (key: string, value: any, depth: number): any => {
        if (value == null) return value;

        // Remove sensitive keys entirely
        if (sensitiveKeys.includes(key)) return undefined;

        // Clip search query
        if (key === 'query' && typeof value === 'string') {
            return value.length > 500 ? value.slice(0, 500) : value;
        }

        // Sanitize URLs by key hint or string value
        if (typeof value === 'string') {
            if (/^(https?:)\/\//i.test(value) || /url|href|link/i.test(key)) {
                return sanitizeUrl(value);
            }
            return value;
        }

        // Clip large arrays and sanitize their contents shallowly
        if (Array.isArray(value)) {
            const clipped = clipArray(value, 50) as any[];
            if (depth <= 0) return clipped;
            return clipped.map((item) => sanitizeValue(key, item, depth - 1));
        }

        // Recurse into objects up to depth limit
        if (typeof value === 'object') {
            if (depth <= 0) return value;
            const out: Record<string, any> = {};
            Object.entries(value).forEach(([k, v]) => {
                const sv = sanitizeValue(k, v, depth - 1);
                if (sv !== undefined) out[k] = sv;
            });
            return out;
        }

        return value;
    };

    const result: Record<string, any> = {};
    Object.entries(props).forEach(([k, v]) => {
        const sv = sanitizeValue(k, v, 2);
        if (sv !== undefined) result[k] = sv;
    });
    return result;
}

// comments in code strictly in English
// Helpers for payload size and URL safety
function clipArray<T>(arr: T[] | undefined, max: number = 50): T[] | undefined {
    if (!Array.isArray(arr)) return arr;
    return arr.length > max ? arr.slice(0, max) : arr;
}

function sanitizeUrl(u: string | undefined): string | undefined {
    if (!u) return u;
    try {
        const url = new URL(u);
        ['access_token', 'id_token', 'refresh_token', 'code', 'state'].forEach((k) => url.searchParams.delete(k));
        return url.toString();
    } catch {
        return u;
    }
}

export async function track(event: string, props?: Record<string, any>) {
    const normalizedEvent = toSnakeCase(event);
    const marketing = getMarketingContext();
    const sanitizedProps = sanitizeProps(props);

    const payload = {
        ...sanitizedProps,
        marketing,
        meta: { ...(sanitizedProps?.meta || {}), source: 'frontend' },
        ...(SEGMENT_DEBUG && { debug_mode: true }),
    };

    // Route via backend beacon if enabled
    if (VIA_BEACON) {
        try {
            // Prefer navigator.sendBeacon when available
            if (typeof navigator !== 'undefined' && typeof (navigator as any).sendBeacon === 'function') {
                const blob = new Blob([JSON.stringify({ event: normalizedEvent, properties: payload })], {
                    type: 'application/json',
                });
                (navigator as any).sendBeacon('/api/analytics/beacon', blob);
            } else {
                await fetch('/api/analytics/beacon', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event: normalizedEvent, properties: payload }),
                    keepalive: true,
                });
            }
            if (SEGMENT_DEBUG) {
                console.log('📫 Event sent via backend beacon:', { event: normalizedEvent, properties: payload });
            }
        } catch (e) {
            console.warn('Beacon send failed, event dropped:', normalizedEvent, e);
        }
        return;
    }

    if (!SEGMENT_ENABLED) return;

    // If offline, enqueue and return early
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        enqueueOffline(normalizedEvent, payload);
        return;
    }

    const [a] = await getAnalytics();
    await flushOfflineQueue(a);
    await a.track(normalizedEvent, payload);

    if (SEGMENT_DEBUG) {
        console.log('📊 Event tracked:', {
            event: normalizedEvent,
            userId: getCurrentUserId(),
            properties: payload,
        });
    }
}

/**
 * Throttle function wrapper for noisy events
 */
function throttled<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    let lastCall = 0;
    let lastCallTimer: NodeJS.Timeout | null = null;
    let lastArgs: Parameters<T> | null = null;

    return ((...args: Parameters<T>) => {
        const now = Date.now();

        if (now - lastCall >= delay) {
            // Execute immediately if enough time has passed
            lastCall = now;
            return fn(...args);
        } else {
            // Schedule execution with latest arguments
            if (lastCallTimer) {
                clearTimeout(lastCallTimer);
            }

            lastArgs = args;
            lastCallTimer = setTimeout(
                () => {
                    if (lastArgs) {
                        lastCall = Date.now();
                        fn(...lastArgs);
                        lastArgs = null;
                    }
                },
                delay - (now - lastCall),
            );
        }
    }) as T;
}

/**
 * Debounce utility for noisy events like search/filter toggles
 */
function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): T {
    let timer: NodeJS.Timeout | null = null;
    return ((...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    }) as T;
}

function shouldSample(oneOutOf: number): boolean {
    if (!Number.isFinite(oneOutOf) || oneOutOf <= 1) return true;
    return Math.random() < 1 / oneOutOf;
}

// Graph interaction events
export const track_graph_view_changed = (p: GraphViewChangeProps) => {
    // comments in code strictly in English
    // Optional sampling for ultra-noisy streams
    if (!shouldSample(SAMPLE_VIEW_CHANGED)) return;
    return track('graph_view_changed', p);
};

export const track_node_clicked = (p: NodeClickProps) => track('node_clicked', p);

export const track_node_expanded = (p: NodeExpansionProps) => track('node_expanded', p);

export const track_node_collapsed = (p: NodeExpansionProps) => track('node_collapsed', p);

export const track_graph_zoomed = throttled((p: GraphZoomProps) => track('graph_zoomed', p), 800);

export const track_graph_filter_changed = debounce((p: GraphFilterProps) => track('graph_filter_changed', p), 700);

// Chat and conversation events
export const track_question_submitted = (p: QuestionSubmittedProps) => track('question_submitted', p);

export const track_conversation_loaded = (p: ConversationLoadedProps) => track('conversation_loaded', p);

// Copy and content events
export const track_message_copied = (p: MessageCopiedProps) => track('message_copied', p);

export const track_content_copied = (p: ContentCopiedProps) => track('content_copied', p);

// Billing and subscription events
export const track_subscription_cancelled = (p: SubscriptionCancelledProps) => track('subscription_cancelled', p);

// Feature usage events
export const track_feature_used = (p: FeatureUsedProps) => track('feature_used', p);

// Error and help events
export const track_error_occurred = (p: ErrorOccurredProps) => track('error_occurred', p);

export const track_help_requested = (p: HelpRequestedProps) => track('help_requested', p);

// Search events
export const track_search_performed = debounce(
    (p: SearchPerformedProps) =>
        track('search_performed', {
            ...p,
            // comments in code strictly in English
            // Clip oversize query to keep payload small and safe
            query: typeof p.query === 'string' && p.query.length > 500 ? p.query.slice(0, 500) : p.query,
        }),
    700,
);

// File events
export const track_file_uploaded = (p: FileUploadedProps) => track('file_uploaded', p);

export const track_download_initiated = (p: DownloadInitiatedProps) => track('download_initiated', p);

// Share events
export const track_share_action = (p: ShareActionProps) => track('share_action', p);

// Preference events
export const track_preference_changed = (p: PreferenceChangedProps) => track('preference_changed', p);

// Tutorial and onboarding events
export const track_tutorial_step = (p: TutorialStepProps) => track('tutorial_step', p);

export const track_onboarding_completed = (p: OnboardingCompletedProps) => track('onboarding_completed', p);

// Auth events (frontend only - no backend events)
export const track_logout_clicked = () => track('logout_clicked');

export function getAnalyticsConfig() {
    return {
        writeKey: SEGMENT_WRITE_KEY,
        enabled: SEGMENT_ENABLED,
        debug: SEGMENT_DEBUG,
    };
}
