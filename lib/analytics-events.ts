/**
 * Marketing site analytics events
 * Centralized tracking for marketing activities
 */

import { track } from './analytics';
import { getMarketingContext } from './marketing-context';

/**
 * Track button clicks with marketing context
 */
export const trackButtonClick = (buttonName: string, location: string, additionalProps?: Record<string, any>) => {
    const marketingContext = getMarketingContext();

    track('button_clicked', {
        button_name: buttonName,
        location,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track form interactions
 */
export const trackFormInteraction = (
    formName: string,
    action: 'viewed' | 'started' | 'completed' | 'abandoned',
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('form_interaction', {
        form_name: formName,
        action,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track feature exploration
 */
export const trackFeatureExploration = (
    featureName: string,
    action: 'viewed' | 'clicked' | 'expanded',
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('feature_exploration', {
        feature_name: featureName,
        action,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track navigation events
 */
export const trackNavigation = (
    fromPage: string,
    toPage: string,
    navigationType: 'link' | 'button' | 'menu' | 'breadcrumb',
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('navigation', {
        from_page: fromPage,
        to_page: toPage,
        navigation_type: navigationType,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (
    linkUrl: string,
    linkText: string,
    location: string,
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('external_link_clicked', {
        link_url: linkUrl,
        link_text: linkText,
        location,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (
    page: string,
    scrollDepth: number, // percentage 0-100
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('scroll_depth', {
        page,
        scroll_depth: scrollDepth,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (
    page: string,
    timeSpent: number, // in seconds
    additionalProps?: Record<string, any>,
) => {
    const marketingContext = getMarketingContext();

    track('time_on_page', {
        page,
        time_spent: timeSpent,
        ...marketingContext,
        ...additionalProps,
        timestamp: new Date().toISOString(),
    });
};
