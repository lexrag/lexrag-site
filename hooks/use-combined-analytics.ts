'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAnalytics } from './use-analytics';
import { useSegment } from './use-segment';

export const useCombinedAnalytics = () => {
    const analytics = useAnalytics();
    const segment = useSegment();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current && typeof window !== 'undefined') {
            isInitialized.current = true;
        }
    }, []);

    const trackContentView = useCallback(
        (contentId: string, contentType: string, contentTitle: string) => {
            analytics.trackContentView(contentId, contentType, contentTitle);
            segment.trackContentView(contentId, contentType, contentTitle);
        },
        [analytics, segment],
    );

    const stopTrackingContent = useCallback(
        (contentId: string, contentType: string) => {
            analytics.stopTrackingContent(contentId, contentType);
            segment.stopTrackingContent(contentId, contentType);
        },
        [analytics, segment],
    );

    const trackGraphNodeClick = useCallback(
        (node: any, graphView: '2d' | '3d', isExpanded: boolean = false) => {
            analytics.trackGraphNodeClick(node, graphView, isExpanded);
            segment.trackGraphNodeClick(node, graphView, isExpanded);
        },
        [analytics, segment],
    );

    const trackGraphNodeExpansion = useCallback(
        (node: any, expansionType: 'expand' | 'collapse', childNodeCount: number = 0) => {
            analytics.trackGraphNodeExpansion(node, expansionType, childNodeCount);
            segment.trackGraphNodeExpansion(node, expansionType, childNodeCount);
        },
        [analytics, segment],
    );

    const trackChatQuestion = useCallback(
        (question: string, sessionId: string, isNewConversation: boolean = false) => {
            analytics.trackChatQuestion(question, sessionId, isNewConversation);
            segment.trackChatQuestion(question, sessionId, isNewConversation);
        },
        [analytics, segment],
    );

    const trackChatResponse = useCallback(
        (
            sessionId: string,
            responseLength: number,
            responseTime: number,
            hasGraph: boolean = false,
            nodeCount: number = 0,
        ) => {
            analytics.trackChatResponse(sessionId, responseLength, responseTime, hasGraph, nodeCount);
            segment.trackChatResponse(sessionId, responseLength, responseTime, hasGraph, nodeCount);
        },
        [analytics, segment],
    );

    const trackAccordionInteraction = useCallback(
        (accordionId: string, accordionType: string, expansionType: 'expand' | 'collapse', itemCount: number = 0) => {
            analytics.trackAccordionInteraction(accordionId, accordionType, expansionType, itemCount);
            segment.trackAccordionInteraction(accordionId, accordionType, expansionType, itemCount);
        },
        [analytics, segment],
    );

    const trackAuth = useCallback(
        (
            action: 'sign_up' | 'sign_in' | 'email_verification',
            method: 'email' | 'google' | 'linkedin',
            success: boolean = true,
        ) => {
            analytics.trackAuth(action, method, success);
            segment.trackAuth(action, method, success);
        },
        [analytics, segment],
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
            segment.trackSubscription(action, planId, planName, amount, invoiceId);
        },
        [analytics, segment],
    );

    const trackCustomEvent = useCallback(
        (action: string, category: string, label?: string, value?: number, customParameters?: Record<string, any>) => {
            analytics.trackEvent(action, category, label, value, customParameters);
            const segmentProperties = {
                category,
                label,
                value,
                ...customParameters,
            };
            segment.trackEvent(action, segmentProperties);
        },
        [analytics, segment],
    );

    const trackPageView = useCallback(
        (pagePath: string, pageTitle: string) => {
            analytics.trackPageView(pagePath, pageTitle);
            segment.trackPageView(pagePath, pageTitle);
        },
        [analytics, segment],
    );

    const trackFeatureAccessed = useCallback(
        (featureName: string, featureType: string) => {
            analytics.trackFeatureAccessed(featureName, featureType);
            segment.trackFeatureAccessed(featureName, featureType);
        },
        [analytics, segment],
    );

    const trackMessageCopied = useCallback(
        (messageId: string, messageType: 'user' | 'ai') => {
            analytics.trackMessageCopied(messageId, messageType);
            segment.trackMessageCopied(messageId, messageType);
        },
        [analytics, segment],
    );

    const trackGraphViewChange = useCallback(
        (fromView: '2d' | '3d', toView: '2d' | '3d') => {
            analytics.trackGraphViewChange(fromView, toView);
            segment.trackGraphViewChange(fromView, toView);
        },
        [analytics, segment],
    );

    const trackGraphZoom = useCallback(
        (zoomType: 'fit' | 'node' | 'manual', targetId?: string) => {
            analytics.trackGraphZoom(zoomType, targetId);
            segment.trackGraphZoom(zoomType, targetId);
        },
        [analytics, segment],
    );

    const trackGraphFilterChange = useCallback(
        (filterType: 'node' | 'link' | 'layer', filterId: string, enabled: boolean) => {
            analytics.trackGraphFilterChange(filterType, filterId, enabled);
            segment.trackGraphFilterChange(filterType, filterId, enabled);
        },
        [analytics, segment],
    );

    const trackContentCopied = useCallback(
        (contentId: string, contentType: string, contentLength: number) => {
            analytics.trackContentCopied(contentId, contentType, contentLength);
            segment.trackContentCopied(contentId, contentType, contentLength);
        },
        [analytics, segment],
    );

    const trackSessionStart = useCallback(() => {
        analytics.trackSessionStart();
        segment.trackSessionStart();
    }, [analytics, segment]);

    const identifyUser = useCallback(
        async (userId: string, userProperties?: Record<string, any>) => {
            await segment.identifyUser(userId, userProperties);
        },
        [segment],
    );

    // Additional functions from Analytics Architecture plan
    const trackStartResearch = useCallback(
        (query: string, language: string = 'en', intent?: string) => {
            segment.trackStartResearch(query, language, intent);
        },
        [segment],
    );

    const trackSubmitDraftRequest = useCallback(
        (docType: string, service: string, length: number) => {
            segment.trackSubmitDraftRequest(docType, service, length);
        },
        [segment],
    );

    const trackViewDraftResult = useCallback(
        (source: string, duration: number, exported: boolean = false) => {
            segment.trackViewDraftResult(source, duration, exported);
        },
        [segment],
    );

    const trackPanelMessageSent = useCallback(
        (role: 'user' | 'assistant', threadId: string, tokensUsed: number) => {
            segment.trackPanelMessageSent(role, threadId, tokensUsed);
        },
        [segment],
    );

    const trackStripeCheckout = useCallback(
        (planId: string, currency: string = 'USD') => {
            segment.trackStripeCheckout(planId, currency);
        },
        [segment],
    );

    const trackStripeSuccess = useCallback(
        (amount: number, invoiceId: string, status: string) => {
            segment.trackStripeSuccess(amount, invoiceId, status);
        },
        [segment],
    );

    const trackBitrixContactSync = useCallback(
        (formType: string, crmId: string) => {
            segment.trackBitrixContactSync(formType, crmId);
        },
        [segment],
    );

    const trackAccountRegistered = useCallback(
        (utmSource?: string, country?: string) => {
            segment.trackAccountRegistered(utmSource, country);
        },
        [segment],
    );

    const isAnalyticsAvailable = useCallback(() => {
        return analytics.isAnalyticsAvailable();
    }, [analytics]);

    const isSegmentAvailable = useCallback(() => {
        return segment.isSegmentAvailable();
    }, [segment]);

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
        isSegmentAvailable,

        analytics,
        segment,

        EVENT_CATEGORIES: analytics.EVENT_CATEGORIES,
        EVENT_ACTIONS: analytics.EVENT_ACTIONS,
        CUSTOM_DIMENSIONS: analytics.CUSTOM_DIMENSIONS,
        LEGAL_CONTENT_TYPES: analytics.LEGAL_CONTENT_TYPES,
        NODE_TYPES: analytics.NODE_TYPES,

        contentTimeTracker: analytics.contentTimeTracker,
        segmentContentTimeTracker: segment.segmentContentTimeTracker,
    };
};

export default useCombinedAnalytics;
