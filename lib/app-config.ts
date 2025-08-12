/**
 * App configuration utility for marketing site
 * Handles environment-specific URLs and settings
 */

interface AppConfig {
    appUrl: string;
    appUrlDev: string;
    baseUrl: string;
    isProduction: boolean;
    isDevelopment: boolean;
}

function getAppConfigInternal(): AppConfig {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.lexrag.com',
        appUrlDev: process.env.NEXT_PUBLIC_APP_URL_DEV || 'http://localhost:3000',
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        isProduction,
        isDevelopment: !isProduction,
    };
}

/**
 * Get the appropriate app URL based on current environment
 * In development, returns dev URL, in production returns production URL
 */
export function getAppUrl(): string {
    const config = getAppConfigInternal();
    return config.isProduction ? config.appUrl : config.appUrlDev;
}

/**
 * Get the base URL for the marketing site
 */
export function getBaseUrl(): string {
    return getAppConfigInternal().baseUrl;
}

/**
 * Check if current environment is production
 */
export function isProduction(): boolean {
    return getAppConfigInternal().isProduction;
}

/**
 * Check if current environment is development
 */
export function isDevelopment(): boolean {
    return getAppConfigInternal().isDevelopment;
}

/**
 * Get full app configuration
 */
export function getAppConfig(): AppConfig {
    return getAppConfigInternal();
}
