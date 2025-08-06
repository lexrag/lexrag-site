'use client';

import { useCallback, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { linkedinSignIn } from '@/api/auth/linkedinSignIn';
import { useSegment } from '@/hooks/use-segment';
import Loading from '@/app/loading';

const OauthCallback = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { trackAuth, trackLinkedInConversion } = useSegment();

    const handleLinkedInSignIn = useCallback(async () => {
        if (!token) return;

        const result = await linkedinSignIn({ token });

        if (!result.success) {
            console.log('error', result.error);
            trackAuth('sign_in', 'linkedin', false);
        } else {
            trackAuth('sign_in', 'linkedin', true);
            
            trackLinkedInConversion('signin');
            
            redirect('/chat/new');
        }
    }, [token, trackAuth, trackLinkedInConversion]);

    useEffect(() => {
        if (token !== undefined) {
            handleLinkedInSignIn();
        }
    }, [token, handleLinkedInSignIn]);

    return (
        <div className="min-h-[100vh] min-w-[100vw] absolute top-0 left-0 dark:bg-secondary light:bg-white">
            <Loading />
        </div>
    );
};

export default OauthCallback;
