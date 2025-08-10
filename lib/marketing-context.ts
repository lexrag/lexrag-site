interface MarketingContext {
    // UTM parameters
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;

    // LinkedIn parameters
    li_fat_id?: string;
    li_click_id?: string;
    li_lead_id?: string;
    li_campaign_id?: string;
    li_ad_id?: string;
    li_placement?: string;

    // First touch timestamp
    first_touch_ts?: number;
}

const STORAGE_KEY_FIRST_TOUCH = 'analytics:first_touch';
const STORAGE_KEY_LATEST = 'analytics:latest';

/**
 * Extract UTM parameters from URL search string
 */
function getUtmFromUrl(search: string): Partial<MarketingContext> {
    const params = new URLSearchParams(search);
    const utm: Partial<MarketingContext> = {};

    // UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
        const value = params.get(key);
        // comments in code strictly in English
        // Persist key if it exists in the URL, regardless of initial object shape
        if (value) {
            (utm as any)[key] = value;
        }
    });

    return utm;
}

/**
 * Extract LinkedIn parameters from URL search string
 */
function getLinkedInFromUrl(search: string): Partial<MarketingContext> {
    const params = new URLSearchParams(search);
    const linkedin: Partial<MarketingContext> = {};

    // LinkedIn parameters (with fallbacks)
    const li_fat_id = params.get('li_fat_id') || params.get('li_click_id');
    if (li_fat_id) {
        linkedin.li_fat_id = li_fat_id;
    }

    ['li_lead_id', 'li_campaign_id', 'li_ad_id', 'li_placement'].forEach((key) => {
        const value = params.get(key);
        // comments in code strictly in English
        // Persist key if it exists in the URL, regardless of initial object shape
        if (value) {
            (linkedin as any)[key] = value;
        }
    });

    return linkedin;
}

/**
 * Read marketing context from URL and persist to storage
 */
export function persistMarketingContextFromUrl(): void {
    if (typeof window === 'undefined') return;

    try {
        const search = window.location.search;
        if (!search) return;

        const utm = getUtmFromUrl(search);
        const linkedin = getLinkedInFromUrl(search);

        // Merge UTM and LinkedIn parameters
        const marketingContext: MarketingContext = {
            ...utm,
            ...linkedin,
        };

        // Only persist if we have actual marketing parameters
        if (Object.keys(marketingContext).length === 0) return;

        // Add timestamp
        marketingContext.first_touch_ts = Date.now();

        // Check if this is the first touch
        const existingFirstTouch = localStorage.getItem(STORAGE_KEY_FIRST_TOUCH);
        if (!existingFirstTouch) {
            localStorage.setItem(STORAGE_KEY_FIRST_TOUCH, JSON.stringify(marketingContext));
        }

        // Always update latest
        localStorage.setItem(STORAGE_KEY_LATEST, JSON.stringify(marketingContext));
    } catch (error) {
        console.warn('Failed to persist marketing context:', error);
    }
}

/**
 * Get marketing context from storage (first touch + latest merged)
 */
export function getMarketingContext(): Partial<MarketingContext> {
    if (typeof window === 'undefined') return {};

    try {
        const firstTouchStr = localStorage.getItem(STORAGE_KEY_FIRST_TOUCH);
        const latestStr = localStorage.getItem(STORAGE_KEY_LATEST);

        const firstTouch: Partial<MarketingContext> = firstTouchStr ? JSON.parse(firstTouchStr) : {};
        const latest: Partial<MarketingContext> = latestStr ? JSON.parse(latestStr) : {};

        // Merge: first touch provides baseline, latest provides updates
        const merged: Partial<MarketingContext> = { ...firstTouch, ...latest };

        // Remove empty/undefined values
        Object.keys(merged).forEach((key) => {
            if (merged[key as keyof MarketingContext] === undefined || merged[key as keyof MarketingContext] === '') {
                delete merged[key as keyof MarketingContext];
            }
        });

        return merged;
    } catch (error) {
        console.warn('Failed to get marketing context:', error);
        return {};
    }
}

/**
 * Clear marketing context from storage
 */
export function clearMarketingContext(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY_FIRST_TOUCH);
        localStorage.removeItem(STORAGE_KEY_LATEST);
    } catch (error) {
        console.warn('Failed to clear marketing context:', error);
    }
}
