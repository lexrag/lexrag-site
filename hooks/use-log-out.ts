'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSession } from '@/utils/auth/deleteSession';
import { useUser } from '@/providers/user-provider';

export const useLogOut = () => {
    const router = useRouter();
    const { setUser } = useUser();

    const logOut = useCallback(async () => {
        localStorage.removeItem('token');

        await deleteSession();
        setUser(null);

        router.push('/');
    }, [router, setUser]);

    return logOut;
};
