import { AnalyticsBrowser } from '@segment/analytics-next';
import { getMeClient } from '@/api/auth/getMeClient';
import { getCurrentSubscription } from '@/api/tariffs/getCurrentSubscription';

declare global {
    interface Window {
        analytics: typeof AnalyticsBrowser;
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

const SEGMENT_WRITE_KEY = '8MIbGPXtsepP3Fw9BH1Kg27lp3dPTBWe';

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

    START_RESEARCH: 'start_research',
    SUBMIT_DRAFT_REQUEST: 'submit_draft_request',
    VIEW_DRAFT_RESULT: 'view_draft_result',
    PANEL_MESSAGE_SENT: 'panel_message_sent',
    STRIPE_CHECKOUT: 'stripe_checkout',
    STRIPE_SUCCESS: 'stripe_success',
    BITRIX_CONTACT_SYNC: 'bitrix_contact_sync',
    ACCOUNT_REGISTERED: 'account_registered',
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
    LINKEDIN_CLICK_ID: 'linkedin_click_id',
    LINKEDIN_LEAD_ID: 'linkedin_lead_id',
    LINKEDIN_CAMPAIGN_ID: 'linkedin_campaign_id',
    LINKEDIN_AD_ID: 'linkedin_ad_id',
    LINKEDIN_PLACEMENT: 'linkedin_placement',
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

export const isSegmentAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof AnalyticsBrowser !== 'undefined';
};

export const isGtagAvailable = (): boolean => {
    return isSegmentAvailable();
};

let analytics: any = null;
let isInitialized = false;

export const initializeSegment = () => {
    if (typeof window !== 'undefined' && !isInitialized) {
        analytics = AnalyticsBrowser.load({
            writeKey: SEGMENT_WRITE_KEY,
        });

        analytics.ready(() => {
            console.log('Segment Analytics initialized');
            analytics.page();
        });

        isInitialized = true;
    }
};

export const initializeAnalytics = initializeSegment;

let userDataCache: { userId: string | null; userType: string; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

const isCacheValid = (): boolean => {
    return !!(userDataCache && (Date.now() - userDataCache.timestamp) < CACHE_DURATION);
};

const clearCache = (): void => {
    userDataCache = null;
};

export const clearSegmentCache = (): void => {
    clearCache();
};

export const getUserId = async (): Promise<string | null> => {
    if (isCacheValid() && userDataCache?.userId) {
        return userDataCache.userId;
    }

    try {
        const userData = await getMeClient();
        
        if (userData && userData.id) {
            const userId = userData.id.toString();
            
            userDataCache = {
                userId,
                userType: userDataCache?.userType || 'free',
                timestamp: Date.now()
            };
            
            return userId;
        }
    } catch (error) {
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('No token found'))) {
            clearCache();
            return null;
        }
        console.error('Error getting user ID for Segment:', error);
    }
    
    return null;
};

export const getUserType = async (): Promise<string> => {
    if (isCacheValid() && userDataCache?.userType) {
        return userDataCache.userType;
    }

    try {
        const subscriptionData = await getCurrentSubscription();
        
        if (subscriptionData && subscriptionData.status === 'active') {
            const tariffId = subscriptionData.tariff_id;
            const planName = subscriptionData.detail?.toLowerCase() || '';

            let userType = 'standard';
            if (planName.includes('premium') || tariffId === 'premium') {
                userType = 'premium';
            } else if (planName.includes('enterprise') || tariffId === 'enterprise') {
                userType = 'enterprise';
            } else if (planName.includes('advanced') || tariffId === 'advanced') {
                userType = 'advanced';
            }

            userDataCache = {
                userId: userDataCache?.userId || null,
                userType,
                timestamp: Date.now()
            };

            return userType;
        }
    } catch (error) {
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('No token found'))) {
            clearCache();
            return 'free';
        }
        console.error('Error getting user type for Segment:', error);
    }
    
    return 'free';
};

export const identifyUser = async (userId: string, userProperties?: Record<string, any>) => {
    if (!isSegmentAvailable()) {
        console.warn('Segment not available');
        return;
    }

    try {
        const userType = await getUserType();
        const properties = {
            user_type: userType,
            ...userProperties,
        };

        analytics.identify(userId, properties);
    } catch (error) {
        console.error('Error identifying user in Segment:', error);
    }
};

export const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
    if (!isSegmentAvailable()) {
        console.warn('Segment not available');
        return;
    }

    if (!analytics) {
        initializeSegment();
    }

    try {
        const userId = await getUserId();
        const userType = await getUserType();

        const urlParams = new URLSearchParams(window.location.search);
        const linkedinProperties = {
            linkedin_click_id: urlParams.get('li_fat_id'),
            linkedin_lead_id: urlParams.get('li_lead_id'),
            linkedin_campaign_id: urlParams.get('li_campaign_id'),
            linkedin_ad_id: urlParams.get('li_ad_id'),
            linkedin_placement: urlParams.get('li_placement'),
        };

        const eventProperties = {
            user_id: userId,
            user_type: userType,
            timestamp: new Date().toISOString(),
            ...linkedinProperties,
            ...properties,
        };

        analytics.track(eventName, eventProperties);
    } catch (error) {
        // Don't log errors for unauthenticated users - this is expected
        if (error instanceof Error && error.message.includes('401')) {
            return;
        }
        console.error('Error tracking event in Segment:', error);
    }
};

export const trackSignUp = async (method: 'email' | 'google' | 'linkedin', success: boolean = true) => {
    const linkedinProperties =
        method === 'linkedin'
            ? {
                  linkedin_signup_method: true,
                  linkedin_conversion_type: 'signup',
              }
            : {};

    await trackEvent(EVENT_ACTIONS.SIGN_UP, {
        signup_method: method,
        success: success,
        ...linkedinProperties,
    });
};

export const trackSignIn = async (method: 'email' | 'google' | 'linkedin', success: boolean = true) => {
    const linkedinProperties =
        method === 'linkedin'
            ? {
                  linkedin_signin_method: true,
                  linkedin_conversion_type: 'signin',
              }
            : {};

    await trackEvent(EVENT_ACTIONS.SIGN_IN, {
        signin_method: method,
        success: success,
        ...linkedinProperties,
    });
};

export const trackEmailVerification = async (success: boolean = true) => {
    await trackEvent(EVENT_ACTIONS.EMAIL_VERIFICATION, {
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

    await trackEvent(EVENT_ACTIONS.QUESTION_SUBMITTED, {
        chat_session_id: sessionId,
        is_new_conversation: isNewConversation,
        question_length: questionLength,
        word_count: wordCount,
        query_complexity: complexity,
    });
};

export const trackResponseReceived = async (
    sessionId: string,
    responseLength: number,
    responseTime: number,
    hasGraph: boolean = false,
    nodeCount: number = 0,
) => {
    await trackEvent(EVENT_ACTIONS.RESPONSE_RECEIVED, {
        chat_session_id: sessionId,
        response_length: responseLength,
        response_time_ms: responseTime,
        has_graph: hasGraph,
        node_count: nodeCount,
    });
};

export const trackMessageCopied = async (messageId: string, messageType: 'user' | 'ai') => {
    await trackEvent(EVENT_ACTIONS.MESSAGE_COPIED, {
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
    await trackEvent(EVENT_ACTIONS.NODE_CLICKED, {
        node_id: nodeId,
        node_type: nodeType,
        node_labels: nodeLabels.join(','),
        graph_view: graphView,
        is_expanded: isExpanded,
    });
};

export const trackNodeExpansion = async (
    nodeId: string,
    nodeType: string,
    expansionType: 'expand' | 'collapse',
    childNodeCount: number = 0,
) => {
    const eventName = expansionType === 'expand' ? EVENT_ACTIONS.NODE_EXPANDED : EVENT_ACTIONS.NODE_COLLAPSED;

    await trackEvent(eventName, {
        node_id: nodeId,
        node_type: nodeType,
        expansion_type: expansionType,
        child_node_count: childNodeCount,
    });
};

export const trackGraphViewChange = async (fromView: '2d' | '3d', toView: '2d' | '3d') => {
    await trackEvent(EVENT_ACTIONS.GRAPH_VIEW_CHANGED, {
        from_view: fromView,
        to_view: toView,
    });
};

export const trackGraphZoom = async (zoomType: 'fit' | 'node' | 'manual', targetId?: string) => {
    await trackEvent(EVENT_ACTIONS.GRAPH_ZOOMED, {
        zoom_type: zoomType,
        target_id: targetId,
    });
};

export const trackGraphFilterChange = async (
    filterType: 'node' | 'link' | 'layer',
    filterId: string,
    enabled: boolean,
) => {
    await trackEvent(EVENT_ACTIONS.GRAPH_FILTER_CHANGED, {
        filter_type: filterType,
        filter_id: filterId,
        enabled: enabled,
    });
};

export const trackAccordionExpansion = async (
    accordionId: string,
    accordionType: string,
    expansionType: 'expand' | 'collapse',
    itemCount: number = 0,
) => {
    const eventName = expansionType === 'expand' ? EVENT_ACTIONS.ACCORDION_EXPANDED : EVENT_ACTIONS.ACCORDION_COLLAPSED;

    await trackEvent(eventName, {
        accordion_id: accordionId,
        accordion_type: accordionType,
        expansion_type: expansionType,
        item_count: itemCount,
    });
};

export const trackContentViewed = async (
    contentId: string,
    contentType: string,
    contentTitle: string,
    viewDuration: number = 0,
) => {
    await trackEvent(EVENT_ACTIONS.CONTENT_VIEWED, {
        content_id: contentId,
        content_type: contentType,
        content_title: contentTitle,
        view_duration_seconds: viewDuration,
    });
};

export const trackContentCopied = async (contentId: string, contentType: string, contentLength: number) => {
    await trackEvent(EVENT_ACTIONS.CONTENT_COPIED, {
        content_id: contentId,
        content_type: contentType,
        content_length: contentLength,
    });
};

export class SegmentContentTimeTracker {
    private startTimes: Map<string, number> = new Map();
    private sessionStartTime: number = Date.now();

    async startTracking(contentId: string, contentType: string) {
        this.startTimes.set(contentId, Date.now());

        await trackEvent(EVENT_ACTIONS.CONTENT_VIEWED, {
            content_id: contentId,
            content_type: contentType,
            action: 'started',
        });
    }

    async stopTracking(contentId: string, contentType: string) {
        const startTime = this.startTimes.get(contentId);
        if (startTime) {
            const duration = (Date.now() - startTime) / 1000;
            this.startTimes.delete(contentId);

            await trackEvent(EVENT_ACTIONS.TIME_SPENT, {
                content_id: contentId,
                content_type: contentType,
                duration_seconds: duration,
            });
        }
    }

    async trackSessionTime() {
        const sessionDuration = (Date.now() - this.sessionStartTime) / 1000;

        await trackEvent(EVENT_ACTIONS.TIME_SPENT, {
            session_duration_seconds: sessionDuration,
        });
    }
}

export const trackPageView = async (pagePath: string, pageTitle: string) => {
    await trackEvent(EVENT_ACTIONS.PAGE_VIEW, {
        page_path: pagePath,
        page_title: pageTitle,
    });
};

export const trackFeatureAccessed = async (featureName: string, featureType: string) => {
    await trackEvent(EVENT_ACTIONS.FEATURE_ACCESSED, {
        feature_name: featureName,
        feature_type: featureType,
    });
};

export const trackSubscriptionStarted = async (planId: string, planName: string, amount: number) => {
    await trackEvent(EVENT_ACTIONS.SUBSCRIPTION_STARTED, {
        plan_id: planId,
        plan_name: planName,
        amount: amount,
        currency: 'USD',
        linkedin_conversion_type: 'subscription_started',
    });
};

export const trackSubscriptionCompleted = async (planId: string, invoiceId: string, amount: number) => {
    await trackEvent(EVENT_ACTIONS.SUBSCRIPTION_COMPLETED, {
        plan_id: planId,
        invoice_id: invoiceId,
        amount: amount,
        currency: 'USD',
        linkedin_conversion_type: 'subscription_completed',
    });
};

export const trackSessionStart = async () => {
    const userType = await getUserType();
    await trackEvent(EVENT_ACTIONS.SESSION_START, {
        user_type: userType,
    });
};

export const trackStartResearch = async (query: string, language: string = 'en', intent?: string) => {
    await trackEvent(EVENT_ACTIONS.START_RESEARCH, {
        query,
        lang: language,
        intent,
    });
};

export const trackSubmitDraftRequest = async (docType: string, service: string, length: number) => {
    await trackEvent(EVENT_ACTIONS.SUBMIT_DRAFT_REQUEST, {
        doc_type: docType,
        service,
        length,
    });
};

export const trackViewDraftResult = async (source: string, duration: number, exported: boolean = false) => {
    await trackEvent(EVENT_ACTIONS.VIEW_DRAFT_RESULT, {
        source,
        duration,
        exported,
    });
};

export const trackPanelMessageSent = async (role: 'user' | 'assistant', threadId: string, tokensUsed: number) => {
    await trackEvent(EVENT_ACTIONS.PANEL_MESSAGE_SENT, {
        role,
        thread_id: threadId,
        tokens_used: tokensUsed,
    });
};

export const trackStripeCheckout = async (planId: string, currency: string = 'USD') => {
    await trackEvent(EVENT_ACTIONS.STRIPE_CHECKOUT, {
        plan_id: planId,
        currency,
    });
};

export const trackStripeSuccess = async (amount: number, invoiceId: string, status: string) => {
    await trackEvent(EVENT_ACTIONS.STRIPE_SUCCESS, {
        amount,
        invoice_id: invoiceId,
        status,
    });
};

export const trackBitrixContactSync = async (formType: string, crmId: string) => {
    await trackEvent(EVENT_ACTIONS.BITRIX_CONTACT_SYNC, {
        form_type: formType,
        crm_id: crmId,
    });
};

export const trackAccountRegistered = async (utmSource?: string, country?: string) => {
    await trackEvent(EVENT_ACTIONS.ACCOUNT_REGISTERED, {
        utm_source: utmSource,
        country,
    });
};

export const trackLinkedInConversion = async (
    conversionType: 'signup' | 'signin' | 'subscription' | 'purchase' | 'lead',
    value?: number,
    currency: string = 'USD',
) => {
    const urlParams = new URLSearchParams(window.location.search);

    await trackEvent('linkedin_conversion', {
        conversion_type: conversionType,
        value: value,
        currency: currency,
        linkedin_click_id: urlParams.get('li_fat_id'),
        linkedin_lead_id: urlParams.get('li_lead_id'),
        linkedin_campaign_id: urlParams.get('li_campaign_id'),
        linkedin_ad_id: urlParams.get('li_ad_id'),
        linkedin_placement: urlParams.get('li_placement'),
    });
};

export const initializeSegmentAnalytics = async () => {
    if (typeof window !== 'undefined') {
        // Инициализируем Segment (включая начальный page call)
        initializeSegment();
        
        // Ждем инициализации Segment
        await new Promise<void>((resolve) => {
            if (analytics && analytics.ready) {
                analytics.ready(() => {
                    resolve();
                });
            } else {
                // Fallback: ждем немного и продолжаем
                setTimeout(resolve, 1000);
            }
        });

        try {
            // Отправляем дополнительные события с обработкой ошибок
            await trackSessionStart();
            await trackPageView(window.location.pathname, document.title);

            // Настраиваем отслеживание изменений маршрута
            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;

            history.pushState = function (...args) {
                originalPushState.apply(history, args);
                trackPageView(window.location.pathname, document.title).catch((error) => {
                    if (error instanceof Error && !error.message?.includes('401')) {
                        console.error('Error tracking pushState page view:', error);
                    }
                });
            };

            history.replaceState = function (...args) {
                originalReplaceState.apply(history, args);
                trackPageView(window.location.pathname, document.title).catch((error) => {
                    if (error instanceof Error && !error.message?.includes('401')) {
                        console.error('Error tracking replaceState page view:', error);
                    }
                });
            };
        } catch (error) {
            if (error instanceof Error && !error.message?.includes('401')) {
                console.error('Error in initializeSegmentAnalytics:', error);
            }
        }
    }
};

export const segmentContentTimeTracker = new SegmentContentTimeTracker();

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
    initializeSegmentAnalytics,
    identifyUser,
    segmentContentTimeTracker,

    trackStartResearch,
    trackSubmitDraftRequest,
    trackViewDraftResult,
    trackPanelMessageSent,
    trackStripeCheckout,
    trackStripeSuccess,
    trackBitrixContactSync,
    trackAccountRegistered,
    trackLinkedInConversion,

    EVENT_CATEGORIES,
    EVENT_ACTIONS,
    CUSTOM_DIMENSIONS,
    LEGAL_CONTENT_TYPES,
    NODE_TYPES,

    isGtagAvailable,
    initializeAnalytics,
    contentTimeTracker: segmentContentTimeTracker,
    clearSegmentCache,
};
