import { identify, alias, getAnonymousId } from './analytics';
import type { UserAnalyticsProfile } from './analytics-types';

let cachedUserProfile: UserAnalyticsProfile | null = null;
let isIdentificationPending = false;

export async function identifyUser(userOrId: UserAnalyticsProfile | string | number): Promise<void> {
    if (isIdentificationPending) {
        console.log('🔄 Identity call already pending, skipping...');
        return;
    }

    try {
        isIdentificationPending = true;

        let userId: string;
        let profile: UserAnalyticsProfile | null = null;

        if (typeof userOrId === 'object') {
            profile = userOrId;
            userId = userOrId.id.toString();
        } else {
            userId = userOrId.toString();
        }

        if (profile) {
            cachedUserProfile = profile;
        }

        // comments in code strictly in English
        // Backend does not expose alias handoff endpoint. As a fallback, optionally send frontend alias
        try {
            const anonymousId = await getAnonymousId();
            if (anonymousId && anonymousId !== 'anonymous') {
                // Best-effort alias on the client (gated by FE_IDENTIFY_ENABLED)
                await alias(userId);
            }
        } catch (e) {
            console.warn('Failed to perform frontend alias fallback:', e);
        }

        await identify(userId);

        console.log('👤 User identified:', { userId, hasProfile: !!profile });
    } finally {
        isIdentificationPending = false;
    }
}

export function getCachedUserProfile(): UserAnalyticsProfile | null {
    return cachedUserProfile;
}

export function clearUserCache(): void {
    cachedUserProfile = null;
    isIdentificationPending = false;
    console.log('🗑️ User cache cleared');
}

export function extractUserId(user: any): string {
    if (!user) return 'anonymous';

    if (typeof user === 'string' || typeof user === 'number') {
        return user.toString();
    }

    return (user.id || user.userId || user.sub || user.uid || 'anonymous').toString();
}

export function createUserProfile(userData: any): UserAnalyticsProfile {
    return {
        id: extractUserId(userData),
        email: userData.email || undefined,
        firstName: userData.first_name || userData.firstName || undefined,
        lastName: userData.last_name || userData.lastName || undefined,
        userType: userData.user_type || userData.userType || 'standard',
        status: userData.status || (userData.is_active ? 'active' : 'inactive'),
        isSocialNetworkUser: userData.is_social_network_user || userData.isSocialNetworkUser || false,
        isActive: userData.is_active !== false && userData.isActive !== false,
        isEmailTwoFactorEnabled: userData.is_email_two_factor_enabled || userData.isEmailTwoFactorEnabled || false,
    };
}
