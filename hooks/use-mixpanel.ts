'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
    mixpanelContentTimeTracker,
    CUSTOM_DIMENSIONS,
    EVENT_ACTIONS,
    EVENT_CATEGORIES,
    initializeMixpanelAnalytics,
    isMixpanelAvailable,
    LEGAL_CONTENT_TYPES,
    NODE_TYPES,
    trackAccordionExpansion,
    trackContentCopied,
    trackContentViewed,
    trackEmailVerification,
    trackEvent,
    trackFeatureAccessed,
    trackGraphFilterChange,
    trackGraphViewChange,
    trackGraphZoom,
    trackMessageCopied,
    trackNodeClick,
    trackNodeExpansion,
    trackPageView,
    trackQuestionSubmitted,
    trackResponseReceived,
    trackSessionStart,
    trackSignIn,
    trackSignUp,
    trackSubscriptionCompleted,
    trackSubscriptionStarted,
    identifyUser,
    trackStartResearch,
    trackSubmitDraftRequest,
    trackViewDraftResult,
    trackPanelMessageSent,
    trackStripeCheckout,
    trackStripeSuccess,
    trackBitrixContactSync,
    trackAccountRegistered,
} from '@/utils/mixpanel';

export const useMixpanel = () => {
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current && typeof window !== 'undefined') {
            initializeMixpanelAnalytics();
            isInitialized.current = true;
        }
    }, []);

    const trackContentView = useCallback((contentId: string, contentType: string, contentTitle: string) => {
        mixpanelContentTimeTracker.startTracking(contentId, contentType);
        trackContentViewed(contentId, contentType, contentTitle);
    }, []);

    const stopTrackingContent = useCallback((contentId: string, contentType: string) => {
        mixpanelContentTimeTracker.stopTracking(contentId, contentType);
    }, []);

    const trackGraphNodeClick = useCallback((node: any, graphView: '2d' | '3d', isExpanded: boolean = false) => {
        const nodeType = node.labels?.[0] || 'unknown';
        const nodeLabels = node.labels || [];

        trackNodeClick(node.id, nodeType, nodeLabels, graphView, isExpanded);
    }, []);

    const trackGraphNodeExpansion = useCallback(
        (node: any, expansionType: 'expand' | 'collapse', childNodeCount: number = 0) => {
            const nodeType = node.labels?.[0] || 'unknown';

            trackNodeExpansion(node.id, nodeType, expansionType, childNodeCount);
        },
        [],
    );

    const trackChatQuestion = useCallback((question: string, sessionId: string, isNewConversation: boolean = false) => {
        trackQuestionSubmitted(question, sessionId, isNewConversation);
    }, []);

    const trackChatResponse = useCallback(
        (
            sessionId: string,
            responseLength: number,
            responseTime: number,
            hasGraph: boolean = false,
            nodeCount: number = 0,
        ) => {
            trackResponseReceived(sessionId, responseLength, responseTime, hasGraph, nodeCount);
        },
        [],
    );

    const trackAccordionInteraction = useCallback(
        (accordionId: string, accordionType: string, expansionType: 'expand' | 'collapse', itemCount: number = 0) => {
            trackAccordionExpansion(accordionId, accordionType, expansionType, itemCount);
        },
        [],
    );

    const trackAuth = useCallback(
        (
            action: 'sign_up' | 'sign_in' | 'email_verification',
            method: 'email' | 'google' | 'linkedin',
            success: boolean = true,
        ) => {
            switch (action) {
                case 'sign_up':
                    trackSignUp(method, success);
                    break;
                case 'sign_in':
                    trackSignIn(method, success);
                    break;
                case 'email_verification':
                    trackEmailVerification(success);
                    break;
            }
        },
        [],
    );

    const trackSubscription = useCallback(
        (
            action: 'started' | 'completed' | 'cancelled',
            planId: string,
            planName: string,
            amount: number,
            invoiceId?: string,
        ) => {
            switch (action) {
                case 'started':
                    trackSubscriptionStarted(planId, planName, amount);
                    break;
                case 'completed':
                    if (invoiceId) {
                        trackSubscriptionCompleted(planId, invoiceId, amount);
                    }
                    break;
            }
        },
        [],
    );

    const trackCustomEvent = useCallback(
        (eventName: string, properties?: Record<string, any>) => {
            trackEvent(eventName, properties);
        },
        [],
    );

    const checkMixpanelAvailable = useCallback(() => {
        return isMixpanelAvailable();
    }, []);

    const identifyUserInMixpanel = useCallback(async (userId: string, userProperties?: Record<string, any>) => {
        await identifyUser(userId, userProperties);
    }, []);

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

        identifyUser: identifyUserInMixpanel,

        isMixpanelAvailable: checkMixpanelAvailable,

        trackStartResearch,
        trackSubmitDraftRequest,
        trackViewDraftResult,
        trackPanelMessageSent,
        trackStripeCheckout,
        trackStripeSuccess,
        trackBitrixContactSync,
        trackAccountRegistered,

        EVENT_CATEGORIES,
        EVENT_ACTIONS,
        CUSTOM_DIMENSIONS,
        LEGAL_CONTENT_TYPES,
        NODE_TYPES,

        mixpanelContentTimeTracker,
    };
};

export default useMixpanel; 