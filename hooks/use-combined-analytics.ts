'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAnalytics } from './use-analytics';
import { useMixpanel } from './use-mixpanel';

export const useCombinedAnalytics = () => {
    const analytics = useAnalytics();
    const mixpanel = useMixpanel();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current && typeof window !== 'undefined') {
            isInitialized.current = true;
        }
    }, []);

    const trackContentView = useCallback((contentId: string, contentType: string, contentTitle: string) => {
        analytics.trackContentView(contentId, contentType, contentTitle);
        mixpanel.trackContentView(contentId, contentType, contentTitle);
    }, [analytics, mixpanel]);

    const stopTrackingContent = useCallback((contentId: string, contentType: string) => {
        analytics.stopTrackingContent(contentId, contentType);
        mixpanel.stopTrackingContent(contentId, contentType);
    }, [analytics, mixpanel]);

    const trackGraphNodeClick = useCallback((node: any, graphView: '2d' | '3d', isExpanded: boolean = false) => {
        analytics.trackGraphNodeClick(node, graphView, isExpanded);
        mixpanel.trackGraphNodeClick(node, graphView, isExpanded);
    }, [analytics, mixpanel]);

    const trackGraphNodeExpansion = useCallback(
        (node: any, expansionType: 'expand' | 'collapse', childNodeCount: number = 0) => {
            analytics.trackGraphNodeExpansion(node, expansionType, childNodeCount);
            mixpanel.trackGraphNodeExpansion(node, expansionType, childNodeCount);
        },
        [analytics, mixpanel],
    );

    const trackChatQuestion = useCallback((question: string, sessionId: string, isNewConversation: boolean = false) => {
        analytics.trackChatQuestion(question, sessionId, isNewConversation);
        mixpanel.trackChatQuestion(question, sessionId, isNewConversation);
    }, [analytics, mixpanel]);

    const trackChatResponse = useCallback(
        (
            sessionId: string,
            responseLength: number,
            responseTime: number,
            hasGraph: boolean = false,
            nodeCount: number = 0,
        ) => {
            analytics.trackChatResponse(sessionId, responseLength, responseTime, hasGraph, nodeCount);
            mixpanel.trackChatResponse(sessionId, responseLength, responseTime, hasGraph, nodeCount);
        },
        [analytics, mixpanel],
    );

    const trackAccordionInteraction = useCallback(
        (accordionId: string, accordionType: string, expansionType: 'expand' | 'collapse', itemCount: number = 0) => {
            analytics.trackAccordionInteraction(accordionId, accordionType, expansionType, itemCount);
            mixpanel.trackAccordionInteraction(accordionId, accordionType, expansionType, itemCount);
        },
        [analytics, mixpanel],
    );

    const trackAuth = useCallback(
        (
            action: 'sign_up' | 'sign_in' | 'email_verification',
            method: 'email' | 'google' | 'linkedin',
            success: boolean = true,
        ) => {
            analytics.trackAuth(action, method, success);
            mixpanel.trackAuth(action, method, success);
        },
        [analytics, mixpanel],
    );

    const trackSubscription = useCallback(
        (
            action: 'started' | 'completed' | 'cancelled',
            planId: string,
            planName: string,
            amount: number,
            invoiceId?: string,
        ) => {
            analytics.trackSubscription(action, planId, planName, amount, invoiceId);
            mixpanel.trackSubscription(action, planId, planName, amount, invoiceId);
        },
        [analytics, mixpanel],
    );

    const trackCustomEvent = useCallback(
        (action: string, category: string, label?: string, value?: number, customParameters?: Record<string, any>) => {
            analytics.trackEvent(action, category, label, value, customParameters);
            const mixpanelProperties = {
                category,
                label,
                value,
                ...customParameters,
            };
            mixpanel.trackEvent(action, mixpanelProperties);
        },
        [analytics, mixpanel],
    );

    const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
        analytics.trackPageView(pagePath, pageTitle);
        mixpanel.trackPageView(pagePath, pageTitle);
    }, [analytics, mixpanel]);

    const trackFeatureAccessed = useCallback((featureName: string, featureType: string) => {
        analytics.trackFeatureAccessed(featureName, featureType);
        mixpanel.trackFeatureAccessed(featureName, featureType);
    }, [analytics, mixpanel]);

    const trackMessageCopied = useCallback((messageId: string, messageType: 'user' | 'ai') => {
        analytics.trackMessageCopied(messageId, messageType);
        mixpanel.trackMessageCopied(messageId, messageType);
    }, [analytics, mixpanel]);

    const trackGraphViewChange = useCallback((fromView: '2d' | '3d', toView: '2d' | '3d') => {
        analytics.trackGraphViewChange(fromView, toView);
        mixpanel.trackGraphViewChange(fromView, toView);
    }, [analytics, mixpanel]);

    const trackGraphZoom = useCallback((zoomType: 'fit' | 'node' | 'manual', targetId?: string) => {
        analytics.trackGraphZoom(zoomType, targetId);
        mixpanel.trackGraphZoom(zoomType, targetId);
    }, [analytics, mixpanel]);

    const trackGraphFilterChange = useCallback(
        (filterType: 'node' | 'link' | 'layer', filterId: string, enabled: boolean) => {
            analytics.trackGraphFilterChange(filterType, filterId, enabled);
            mixpanel.trackGraphFilterChange(filterType, filterId, enabled);
        },
        [analytics, mixpanel],
    );

    const trackContentCopied = useCallback((contentId: string, contentType: string, contentLength: number) => {
        analytics.trackContentCopied(contentId, contentType, contentLength);
        mixpanel.trackContentCopied(contentId, contentType, contentLength);
    }, [analytics, mixpanel]);

    const trackSessionStart = useCallback(() => {
        analytics.trackSessionStart();
        mixpanel.trackSessionStart();
    }, [analytics, mixpanel]);

    const identifyUser = useCallback(async (userId: string, userProperties?: Record<string, any>) => {
        await mixpanel.identifyUser(userId, userProperties);
    }, [mixpanel]);

    // Additional functions from Analytics Architecture plan
    const trackStartResearch = useCallback((query: string, language: string = 'en', intent?: string) => {
        mixpanel.trackStartResearch(query, language, intent);
    }, [mixpanel]);

    const trackSubmitDraftRequest = useCallback((docType: string, service: string, length: number) => {
        mixpanel.trackSubmitDraftRequest(docType, service, length);
    }, [mixpanel]);

    const trackViewDraftResult = useCallback((source: string, duration: number, exported: boolean = false) => {
        mixpanel.trackViewDraftResult(source, duration, exported);
    }, [mixpanel]);

    const trackPanelMessageSent = useCallback((role: 'user' | 'assistant', threadId: string, tokensUsed: number) => {
        mixpanel.trackPanelMessageSent(role, threadId, tokensUsed);
    }, [mixpanel]);

    const trackStripeCheckout = useCallback((planId: string, currency: string = 'USD') => {
        mixpanel.trackStripeCheckout(planId, currency);
    }, [mixpanel]);

    const trackStripeSuccess = useCallback((amount: number, invoiceId: string, status: string) => {
        mixpanel.trackStripeSuccess(amount, invoiceId, status);
    }, [mixpanel]);

    const trackBitrixContactSync = useCallback((formType: string, crmId: string) => {
        mixpanel.trackBitrixContactSync(formType, crmId);
    }, [mixpanel]);

    const trackAccountRegistered = useCallback((utmSource?: string, country?: string) => {
        mixpanel.trackAccountRegistered(utmSource, country);
    }, [mixpanel]);

    const isAnalyticsAvailable = useCallback(() => {
        return analytics.isAnalyticsAvailable();
    }, [analytics]);

    const isMixpanelAvailable = useCallback(() => {
        return mixpanel.isMixpanelAvailable();
    }, [mixpanel]);

    return {
        trackEvent: trackCustomEvent,
        trackPageView,
        trackFeatureAccessed,
        trackAuth,
        trackChatQuestion,
        trackChatResponse,
        trackMessageCopied,
        trackGraphNodeClick,
        trackGraphNodeExpansion,
        trackGraphViewChange,
        trackGraphZoom,
        trackGraphFilterChange,
        trackContentView,
        stopTrackingContent,
        trackContentCopied,
        trackAccordionInteraction,
        trackSubscription,
        trackSessionStart,
        identifyUser,
        trackStartResearch,
        trackSubmitDraftRequest,
        trackViewDraftResult,
        trackPanelMessageSent,
        trackStripeCheckout,
        trackStripeSuccess,
        trackBitrixContactSync,
        trackAccountRegistered,

        isAnalyticsAvailable,
        isMixpanelAvailable,

        analytics,
        mixpanel,

        EVENT_CATEGORIES: analytics.EVENT_CATEGORIES,
        EVENT_ACTIONS: analytics.EVENT_ACTIONS,
        CUSTOM_DIMENSIONS: analytics.CUSTOM_DIMENSIONS,
        LEGAL_CONTENT_TYPES: analytics.LEGAL_CONTENT_TYPES,
        NODE_TYPES: analytics.NODE_TYPES,

        contentTimeTracker: analytics.contentTimeTracker,
        mixpanelContentTimeTracker: mixpanel.mixpanelContentTimeTracker,
    };
};

export default useCombinedAnalytics; 