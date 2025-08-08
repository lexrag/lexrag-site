'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSession } from '@/utils/auth/deleteSession';
import { useUser } from '@/providers/user-provider';
import { clearSegmentCache } from '@/utils/segment';

export const useLogOut = () => {
    const router = useRouter();
    const { setUser } = useUser();

    const logOut = useCallback(async () => {
        localStorage.removeItem('token');

        await deleteSession();
        setUser(null);
        
        clearSegmentCache();

        router.push('/');
    }, [router, setUser]);

    return logOut;
};
