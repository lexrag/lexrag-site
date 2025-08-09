'use client';

import { useCallback, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { googleSignIn } from '@/api/auth/googleSignIn';
import { identifyUser } from '@/lib/user-analytics';
import { getMeClient } from '@/api/auth/getMeClient';
import Loading from '@/app/loading';

const OauthCallback = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const handleGoogleSignIn = useCallback(async () => {
        if (!code) return;

        const result = await googleSignIn({ code });

        if (!result.success) {
            console.log('error', result.error);
        } else {
            try {
                const userData = await getMeClient();
                if (userData) {
                    await identifyUser(userData);
                }
            } catch (error) {
                console.error('Error identifying user after OAuth:', error);
            }
            redirect('/chat/new');
        }
    }, [code]);

    useEffect(() => {
        if (code !== undefined) {
            handleGoogleSignIn();
        }
    }, [code, handleGoogleSignIn]);

    return (
        <div className="min-h-[100vh] min-w-[100vw] absolute top-0 left-0 dark:bg-secondary light:bg-white">
            <Loading />
        </div>
    );
};

export default OauthCallback;
