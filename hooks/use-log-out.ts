'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/api/auth/logout';
import { deleteSession } from '@/utils/auth/deleteSession';
import { analyticsReset, track_logout_clicked } from '@/lib/analytics';
import { clearUserCache } from '@/lib/user-analytics';
import { useUser } from '@/providers/user-provider';

export const useLogOut = () => {
    const router = useRouter();
    const { setUser } = useUser();

    const logOut = useCallback(async () => {
        // Track logout click before making any API calls
        track_logout_clicked();

        try {
            const result = await logout();
            if (result.success) {
                console.debug('✅ Logout API successful - sessions revoked on backend');
            } else {
                console.warn('⚠️ Logout API error:', result.error, '- continuing with local cleanup');
            }
        } catch (error) {
            console.warn('⚠️ Logout API failed (CORS/Network):', error, '- continuing with local cleanup');
        }

        localStorage.removeItem('token');
        try {
            await deleteSession();
        } catch (error) {
            console.warn('⚠️ deleteSession fallback failed:', error);
        }
        setUser(null);

        try {
            clearUserCache();
            await analyticsReset();
            console.debug('✅ Analytics reset successful');
        } catch (error) {
            console.error('❌ Analytics reset failed:', error);
        }

        router.push('/');
        console.debug('✅ Logout completed - redirected to home');
    }, [router, setUser]);

    return logOut;
};
