'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useSegment } from './use-segment';

export const useCombinedAnalytics = () => {
    const segment = useSegment();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current && typeof window !== 'undefined') {
            isInitialized.current = true;
        }
    }, []);

    const trackContentView = useCallback(
        (contentId: string, contentType: string, contentTitle: string) => {
            segment.trackContentView(contentId, contentType, contentTitle);
        },
        [segment],
    );

    const stopTrackingContent = useCallback(
        (contentId: string, contentType: string) => {
            segment.stopTrackingContent(contentId, contentType);
        },
        [segment],
    );

    const trackGraphNodeClick = useCallback(
        (node: any, graphView: '2d' | '3d', isExpanded: boolean = false) => {
            segment.trackGraphNodeClick(node, graphView, isExpanded);
        },
        [segment],
    );

    const trackGraphNodeExpansion = useCallback(
        (node: any, expansionType: 'expand' | 'collapse', childNodeCount: number = 0) => {
            segment.trackGraphNodeExpansion(node, expansionType, childNodeCount);
        },
        [segment],
    );

    const trackChatQuestion = useCallback(
        (question: string, sessionId: string, isNewConversation: boolean = false) => {
            segment.trackChatQuestion(question, sessionId, isNewConversation);
        },
        [segment],
    );

    const trackChatResponse = useCallback(
        (
            sessionId: string,
            responseLength: number,
            responseTime: number,
            hasGraph: boolean = false,
            nodeCount: number = 0,
        ) => {
            segment.trackChatResponse(sessionId, responseLength, responseTime, hasGraph, nodeCount);
        },
        [segment],
    );

    const trackAccordionInteraction = useCallback(
        (accordionId: string, accordionType: string, expansionType: 'expand' | 'collapse', itemCount: number = 0) => {
            segment.trackAccordionInteraction(accordionId, accordionType, expansionType, itemCount);
        },
        [segment],
    );

    const trackAuth = useCallback(
        (
            action: 'sign_up' | 'sign_in' | 'email_verification',
            method: 'email' | 'google' | 'linkedin',
            success: boolean = true,
        ) => {
            segment.trackAuth(action, method, success);
        },
        [segment],
    );

    const trackSubscription = useCallback(
        (
            action: 'started' | 'completed' | 'cancelled',
            planId: string,
            planName: string,
            amount: number,
            invoiceId?: string,
        ) => {
            segment.trackSubscription(action, planId, planName, amount, invoiceId);
        },
        [segment],
    );

    const trackCustomEvent = useCallback(
        (action: string, category: string, label?: string, value?: number, customParameters?: Record<string, any>) => {
            const segmentProperties = {
                category,
                label,
                value,
                ...customParameters,
            };
            segment.trackEvent(action, segmentProperties);
        },
        [segment],
    );

    const trackPageView = useCallback(
        (pagePath: string, pageTitle: string) => {
            segment.trackPageView(pagePath, pageTitle);
        },
        [segment],
    );

    const trackFeatureAccessed = useCallback(
        (featureName: string, featureType: string) => {
            segment.trackFeatureAccessed(featureName, featureType);
        },
        [segment],
    );

    const trackMessageCopied = useCallback(
        (messageId: string, messageType: 'user' | 'ai') => {
            segment.trackMessageCopied(messageId, messageType);
        },
        [segment],
    );

    const trackGraphViewChange = useCallback(
        (fromView: '2d' | '3d', toView: '2d' | '3d') => {
            segment.trackGraphViewChange(fromView, toView);
        },
        [segment],
    );

    const trackGraphZoom = useCallback(
        (zoomType: 'fit' | 'node' | 'manual', targetId?: string) => {
            segment.trackGraphZoom(zoomType, targetId);
        },
        [segment],
    );

    const trackGraphFilterChange = useCallback(
        (filterType: 'node' | 'link' | 'layer', filterId: string, enabled: boolean) => {
            segment.trackGraphFilterChange(filterType, filterId, enabled);
        },
        [segment],
    );

    const trackContentCopied = useCallback(
        (contentId: string, contentType: string, contentLength: number) => {
            segment.trackContentCopied(contentId, contentType, contentLength);
        },
        [segment],
    );

    const trackSessionStart = useCallback(() => {
        segment.trackSessionStart();
    }, [segment]);

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
        return segment.isAnalyticsAvailable();
    }, [segment]);

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

        // Для совместимости
        analytics: segment,
        segment,

        EVENT_CATEGORIES: segment.EVENT_CATEGORIES,
        EVENT_ACTIONS: segment.EVENT_ACTIONS,
        CUSTOM_DIMENSIONS: segment.CUSTOM_DIMENSIONS,
        LEGAL_CONTENT_TYPES: segment.LEGAL_CONTENT_TYPES,
        NODE_TYPES: segment.NODE_TYPES,

        contentTimeTracker: segment.contentTimeTracker,
        segmentContentTimeTracker: segment.segmentContentTimeTracker,
    };
};

export default useCombinedAnalytics;
