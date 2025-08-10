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

const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || '8MIbGPXtsepP3Fw9BH1Kg27lp3dPTBWe';
const SEGMENT_ENABLED = process.env.NEXT_PUBLIC_SEGMENT_ENABLED !== 'false'; // Default to enabled
const SEGMENT_DEBUG = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SEGMENT_DEBUG === 'true';

let analyticsSingleton: any = null;
let currentUserId: string | null = null; // Track current user state

export function getAnalytics(): any {
    if (!SEGMENT_ENABLED || !SEGMENT_WRITE_KEY) {
        // Return mock analytics when disabled
        return Promise.resolve([
            {
                page: () => Promise.resolve(),
                track: () => Promise.resolve(),
                identify: () => Promise.resolve(),
                reset: () => Promise.resolve(),
            },
        ]);
    }

    if (!analyticsSingleton) {
        analyticsSingleton = AnalyticsBrowser.load({
            writeKey: SEGMENT_WRITE_KEY,
        });
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
    if (!SEGMENT_ENABLED) return;

    const [a] = await getAnalytics();
    const payload = {
        ...(props || {}),
        ...(SEGMENT_DEBUG && { debug_mode: true }),
    };
    await a.page(undefined, payload);

    if (SEGMENT_DEBUG) {
        console.log('📄 Page tracked:', { userId: getCurrentUserId(), properties: payload });
    }
}

export async function identify(userId: string) {
    if (!SEGMENT_ENABLED) return;

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
    const sanitized = { ...props };

    sensitiveKeys.forEach((key) => {
        if (sanitized[key] !== undefined) {
            delete sanitized[key];
        }
    });

    return sanitized;
}

export async function track(event: string, props?: Record<string, any>) {
    if (!SEGMENT_ENABLED) return;

    const normalizedEvent = toSnakeCase(event);
    const marketing = getMarketingContext();
    const sanitizedProps = sanitizeProps(props);

    const payload = {
        ...sanitizedProps,
        marketing,
        meta: { ...(sanitizedProps?.meta || {}), source: 'frontend' },
        ...(SEGMENT_DEBUG && { debug_mode: true }),
    };

    const [a] = await getAnalytics();
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

// Graph interaction events
export const track_graph_view_changed = (p: GraphViewChangeProps) => track('graph_view_changed', p);

export const track_node_clicked = (p: NodeClickProps) => track('node_clicked', p);

export const track_node_expanded = (p: NodeExpansionProps) => track('node_expanded', p);

export const track_node_collapsed = (p: NodeExpansionProps) => track('node_collapsed', p);

export const track_graph_zoomed = throttled((p: GraphZoomProps) => track('graph_zoomed', p), 800);

export const track_graph_filter_changed = (p: GraphFilterProps) => track('graph_filter_changed', p);

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
export const track_search_performed = (p: SearchPerformedProps) => track('search_performed', p);

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
