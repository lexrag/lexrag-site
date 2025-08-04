declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const EVENT_CATEGORIES = {
    AUTH: 'authentication',
    CHAT: 'ai_chat',
    GRAPH: 'graph_interaction',
    CONTENT: 'content_interaction',
    NAVIGATION: 'navigation',
    SUBSCRIPTION: 'subscription',
    PERFORMANCE: 'performance',
} as const;

export const EVENT_ACTIONS = {
    SIGN_UP: 'sign_up',
    SIGN_IN: 'sign_in',
    SIGN_OUT: 'sign_out',
    EMAIL_VERIFICATION: 'email_verification',

    QUESTION_SUBMITTED: 'question_submitted',
    RESPONSE_RECEIVED: 'response_received',
    CHAT_STARTED: 'chat_started',
    MESSAGE_COPIED: 'message_copied',

    NODE_CLICKED: 'node_clicked',
    NODE_EXPANDED: 'node_expanded',
    NODE_COLLAPSED: 'node_collapsed',
    GRAPH_VIEW_CHANGED: 'graph_view_changed',
    GRAPH_ZOOMED: 'graph_zoomed',
    GRAPH_FILTER_CHANGED: 'graph_filter_changed',

    ACCORDION_EXPANDED: 'accordion_expanded',
    ACCORDION_COLLAPSED: 'accordion_collapsed',
    CONTENT_VIEWED: 'content_viewed',
    CONTENT_COPIED: 'content_copied',

    PAGE_VIEW: 'page_view',
    FEATURE_ACCESSED: 'feature_accessed',

    SUBSCRIPTION_STARTED: 'subscription_started',
    SUBSCRIPTION_COMPLETED: 'subscription_completed',
    SUBSCRIPTION_CANCELLED: 'subscription_cancelled',

    TIME_SPENT: 'time_spent',
    SESSION_START: 'session_start',
} as const;

export const CUSTOM_DIMENSIONS = {
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
    CONTENT_TYPE: 'content_type',
    LEGAL_DOMAIN: 'legal_domain',
    GRAPH_VIEW_MODE: 'graph_view_mode',
    NODE_TYPE: 'node_type',
    ACCORDION_TYPE: 'accordion_type',
    CHAT_SESSION_ID: 'chat_session_id',
    RESPONSE_LENGTH: 'response_length',
    QUERY_COMPLEXITY: 'query_complexity',
} as const;

export const LEGAL_CONTENT_TYPES = {
    CASE_LAW: 'case_law',
    ACT: 'act',
    REGULATION: 'regulation',
    SUBSIDIARY_LEGISLATION: 'subsidiary_legislation',
    PARAGRAPH: 'paragraph',
    SECTION: 'section',
    ARTICLE: 'article',
    COURT: 'court',
    JUDGE: 'judge',
    PARTY: 'party',
    CITATION: 'citation',
    TOPIC: 'topic',
    CONCEPT: 'concept',
} as const;

export const NODE_TYPES = {
    CASE: 'case',
    ACT: 'act',
    REGULATION: 'regulation',
    PARAGRAPH: 'paragraph',
    SECTION: 'section',
    COURT: 'court',
    JUDGE: 'judge',
    PARTY: 'party',
    TOPIC: 'topic',
    CONCEPT: 'concept',
} as const;

export const isGtagAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const getUserId = async (): Promise<string | null> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData.id?.toString() || null;
        }
    } catch (error) {
        console.error('Error getting user ID:', error);
    }
    return null;
};

export const getUserType = async (): Promise<string> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return 'free';
        }

        const subscriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/subscriptions/any`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (subscriptionResponse.ok) {
            const subscriptionData = await subscriptionResponse.json();
            if (subscriptionData && subscriptionData.status === 'active') {
                const tariffId = subscriptionData.tariff_id;
                const planName = subscriptionData.detail?.toLowerCase() || '';

                if (planName.includes('premium') || tariffId === 'premium') {
                    return 'premium';
                } else if (planName.includes('enterprise') || tariffId === 'enterprise') {
                    return 'enterprise';
                } else if (planName.includes('advanced') || tariffId === 'advanced') {
                    return 'advanced';
                } else {
                    return 'standard';
                }
            }
        }
    } catch (error) {
        console.error('Error getting user type:', error);
    }
    return 'free';
};

export const trackEvent = async (
    action: string,
    category: string,
    label?: string,
    value?: number,
    customParameters?: Record<string, any>,
) => {
    if (!isGtagAvailable()) {
        console.warn('Google Analytics not available');
        return;
    }

    const eventData: any = {
        event_category: category,
        event_label: label,
        value: value,
        ...customParameters,
    };

    try {
        const userId = await getUserId();
        if (userId) {
            eventData.user_id = userId;
            const userType = await getUserType();
            eventData.user_type = userType;
        }
    } catch (error) {
        console.error('Error getting user data for analytics:', error);
    }

    window.gtag('event', action, eventData);
};

export const trackSignUp = async (method: 'email' | 'google' | 'linkedin', success: boolean = true) => {
    await trackEvent(EVENT_ACTIONS.SIGN_UP, EVENT_CATEGORIES.AUTH, method, success ? 1 : 0, {
        signup_method: method,
        success: success,
    });
};

export const trackSignIn = async (method: 'email' | 'google' | 'linkedin', success: boolean = true) => {
    await trackEvent(EVENT_ACTIONS.SIGN_IN, EVENT_CATEGORIES.AUTH, method, success ? 1 : 0, {
        signin_method: method,
        success: success,
    });
};

export const trackEmailVerification = async (success: boolean = true) => {
    await trackEvent(EVENT_ACTIONS.EMAIL_VERIFICATION, EVENT_CATEGORIES.AUTH, 'email_verification', success ? 1 : 0, {
        success: success,
    });
};

export const trackQuestionSubmitted = async (
    question: string,
    sessionId: string,
    isNewConversation: boolean = false,
) => {
    const questionLength = question.length;
    const wordCount = question.split(/\s+/).length;

    const complexity = questionLength > 200 ? 'high' : questionLength > 100 ? 'medium' : 'low';

    await trackEvent(EVENT_ACTIONS.QUESTION_SUBMITTED, EVENT_CATEGORIES.CHAT, 'question_submitted', 1, {
        chat_session_id: sessionId,
        is_new_conversation: isNewConversation,
        question_length: questionLength,
        word_count: wordCount,
        query_complexity: complexity,
        timestamp: new Date().toISOString(),
    });
};

export const trackResponseReceived = async (
    sessionId: string,
    responseLength: number,
    responseTime: number,
    hasGraph: boolean = false,
    nodeCount: number = 0,
) => {
    await trackEvent(EVENT_ACTIONS.RESPONSE_RECEIVED, EVENT_CATEGORIES.CHAT, 'response_received', 1, {
        chat_session_id: sessionId,
        response_length: responseLength,
        response_time_ms: responseTime,
        has_graph: hasGraph,
        node_count: nodeCount,
        timestamp: new Date().toISOString(),
    });
};

export const trackMessageCopied = async (messageId: string, messageType: 'user' | 'ai') => {
    await trackEvent(EVENT_ACTIONS.MESSAGE_COPIED, EVENT_CATEGORIES.CHAT, 'message_copied', 1, {
        message_id: messageId,
        message_type: messageType,
    });
};

export const trackNodeClick = async (
    nodeId: string,
    nodeType: string,
    nodeLabels: string[],
    graphView: '2d' | '3d',
    isExpanded: boolean = false,
) => {
    await trackEvent(EVENT_ACTIONS.NODE_CLICKED, EVENT_CATEGORIES.GRAPH, 'node_clicked', 1, {
        node_id: nodeId,
        node_type: nodeType,
        node_labels: nodeLabels.join(','),
        graph_view: graphView,
        is_expanded: isExpanded,
        timestamp: new Date().toISOString(),
    });
};

export const trackNodeExpansion = async (
    nodeId: string,
    nodeType: string,
    expansionType: 'expand' | 'collapse',
    childNodeCount: number = 0,
) => {
    const action = expansionType === 'expand' ? EVENT_ACTIONS.NODE_EXPANDED : EVENT_ACTIONS.NODE_COLLAPSED;

    await trackEvent(action, EVENT_CATEGORIES.GRAPH, 'node_expansion', 1, {
        node_id: nodeId,
        node_type: nodeType,
        expansion_type: expansionType,
        child_node_count: childNodeCount,
        timestamp: new Date().toISOString(),
    });
};

export const trackGraphViewChange = async (fromView: '2d' | '3d', toView: '2d' | '3d') => {
    await trackEvent(EVENT_ACTIONS.GRAPH_VIEW_CHANGED, EVENT_CATEGORIES.GRAPH, 'graph_view_changed', 1, {
        from_view: fromView,
        to_view: toView,
        timestamp: new Date().toISOString(),
    });
};

export const trackGraphZoom = async (zoomType: 'fit' | 'node' | 'manual', targetId?: string) => {
    await trackEvent(EVENT_ACTIONS.GRAPH_ZOOMED, EVENT_CATEGORIES.GRAPH, 'graph_zoomed', 1, {
        zoom_type: zoomType,
        target_id: targetId,
        timestamp: new Date().toISOString(),
    });
};

export const trackGraphFilterChange = async (
    filterType: 'node' | 'link' | 'layer',
    filterId: string,
    enabled: boolean,
) => {
    await trackEvent(EVENT_ACTIONS.GRAPH_FILTER_CHANGED, EVENT_CATEGORIES.GRAPH, 'graph_filter_changed', 1, {
        filter_type: filterType,
        filter_id: filterId,
        enabled: enabled,
        timestamp: new Date().toISOString(),
    });
};

export const trackAccordionExpansion = async (
    accordionId: string,
    accordionType: string,
    expansionType: 'expand' | 'collapse',
    itemCount: number = 0,
) => {
    const action = expansionType === 'expand' ? EVENT_ACTIONS.ACCORDION_EXPANDED : EVENT_ACTIONS.ACCORDION_COLLAPSED;

    await trackEvent(action, EVENT_CATEGORIES.CONTENT, 'accordion_expansion', 1, {
        accordion_id: accordionId,
        accordion_type: accordionType,
        expansion_type: expansionType,
        item_count: itemCount,
        timestamp: new Date().toISOString(),
    });
};

export const trackContentViewed = async (
    contentId: string,
    contentType: string,
    contentTitle: string,
    viewDuration: number = 0,
) => {
    await trackEvent(EVENT_ACTIONS.CONTENT_VIEWED, EVENT_CATEGORIES.CONTENT, 'content_viewed', 1, {
        content_id: contentId,
        content_type: contentType,
        content_title: contentTitle,
        view_duration_seconds: viewDuration,
        timestamp: new Date().toISOString(),
    });
};

export const trackContentCopied = async (contentId: string, contentType: string, contentLength: number) => {
    await trackEvent(EVENT_ACTIONS.CONTENT_COPIED, EVENT_CATEGORIES.CONTENT, 'content_copied', 1, {
        content_id: contentId,
        content_type: contentType,
        content_length: contentLength,
        timestamp: new Date().toISOString(),
    });
};

export class ContentTimeTracker {
    private startTimes: Map<string, number> = new Map();
    private sessionStartTime: number = Date.now();

    async startTracking(contentId: string, contentType: string) {
        this.startTimes.set(contentId, Date.now());

        await trackEvent(EVENT_ACTIONS.CONTENT_VIEWED, EVENT_CATEGORIES.CONTENT, 'content_view_started', 1, {
            content_id: contentId,
            content_type: contentType,
            timestamp: new Date().toISOString(),
        });
    }

    async stopTracking(contentId: string, contentType: string) {
        const startTime = this.startTimes.get(contentId);
        if (startTime) {
            const duration = (Date.now() - startTime) / 1000;
            this.startTimes.delete(contentId);

            await trackEvent(
                EVENT_ACTIONS.TIME_SPENT,
                EVENT_CATEGORIES.PERFORMANCE,
                'content_time_spent',
                Math.round(duration),
                {
                    content_id: contentId,
                    content_type: contentType,
                    duration_seconds: duration,
                    timestamp: new Date().toISOString(),
                },
            );
        }
    }

    async trackSessionTime() {
        const sessionDuration = (Date.now() - this.sessionStartTime) / 1000;

        await trackEvent(
            EVENT_ACTIONS.TIME_SPENT,
            EVENT_CATEGORIES.PERFORMANCE,
            'session_time_spent',
            Math.round(sessionDuration),
            {
                session_duration_seconds: sessionDuration,
                timestamp: new Date().toISOString(),
            },
        );
    }
}

export const trackPageView = async (pagePath: string, pageTitle: string) => {
    await trackEvent(EVENT_ACTIONS.PAGE_VIEW, EVENT_CATEGORIES.NAVIGATION, 'page_view', 1, {
        page_path: pagePath,
        page_title: pageTitle,
        timestamp: new Date().toISOString(),
    });
};

export const trackFeatureAccessed = async (featureName: string, featureType: string) => {
    await trackEvent(EVENT_ACTIONS.FEATURE_ACCESSED, EVENT_CATEGORIES.NAVIGATION, 'feature_accessed', 1, {
        feature_name: featureName,
        feature_type: featureType,
        timestamp: new Date().toISOString(),
    });
};

export const trackSubscriptionStarted = async (planId: string, planName: string, amount: number) => {
    await trackEvent(EVENT_ACTIONS.SUBSCRIPTION_STARTED, EVENT_CATEGORIES.SUBSCRIPTION, 'subscription_started', 1, {
        plan_id: planId,
        plan_name: planName,
        amount: amount,
        currency: 'USD',
        timestamp: new Date().toISOString(),
    });
};

export const trackSubscriptionCompleted = async (planId: string, invoiceId: string, amount: number) => {
    await trackEvent(EVENT_ACTIONS.SUBSCRIPTION_COMPLETED, EVENT_CATEGORIES.SUBSCRIPTION, 'subscription_completed', 1, {
        plan_id: planId,
        invoice_id: invoiceId,
        amount: amount,
        currency: 'USD',
        timestamp: new Date().toISOString(),
    });
};

export const trackSessionStart = async () => {
    const userType = await getUserType();
    await trackEvent(EVENT_ACTIONS.SESSION_START, EVENT_CATEGORIES.PERFORMANCE, 'session_start', 1, {
        user_type: userType,
        timestamp: new Date().toISOString(),
    });
};

export const initializeAnalytics = async () => {
    if (typeof window !== 'undefined') {
        await trackSessionStart();

        await trackPageView(window.location.pathname, document.title);

        if (typeof window !== 'undefined') {
            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;

            history.pushState = function (...args) {
                originalPushState.apply(history, args);
                trackPageView(window.location.pathname, document.title);
            };

            history.replaceState = function (...args) {
                originalReplaceState.apply(history, args);
                trackPageView(window.location.pathname, document.title);
            };
        }
    }
};

export const contentTimeTracker = new ContentTimeTracker();

export default {
    trackEvent,
    trackSignUp,
    trackSignIn,
    trackEmailVerification,
    trackQuestionSubmitted,
    trackResponseReceived,
    trackMessageCopied,
    trackNodeClick,
    trackNodeExpansion,
    trackGraphViewChange,
    trackGraphZoom,
    trackGraphFilterChange,
    trackAccordionExpansion,
    trackContentViewed,
    trackContentCopied,
    trackPageView,
    trackFeatureAccessed,
    trackSubscriptionStarted,
    trackSubscriptionCompleted,
    trackSessionStart,
    initializeAnalytics,
    contentTimeTracker,
    EVENT_CATEGORIES,
    EVENT_ACTIONS,
    CUSTOM_DIMENSIONS,
    LEGAL_CONTENT_TYPES,
    NODE_TYPES,
};
