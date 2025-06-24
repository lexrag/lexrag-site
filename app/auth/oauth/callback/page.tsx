'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { googleSignIn } from '@/api/auth/googleSignIn';
import Loading from '@/app/loading';

const OauthCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleGoogleSignIn = async () => {
    if (!code) return;

    const result = await googleSignIn({ code });

    if (!result.success) {
      console.log('error', result.error);
    } else {
      redirect('/chat/new');
    }
  };

  useEffect(() => {
    if (code !== undefined) {
      handleGoogleSignIn();
    }
  }, [code]);

  return <Loading />;
};

export default OauthCallback;
