'use server';

import { cookies } from 'next/headers';

export const setSession = async (session: string) => {
    const expiresAt = new Date(
        Date.now() + parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRATION_MINUTES as string) * 60 * 1000,
    );
    const cookieStore = await cookies();

    // In development over HTTP, Secure cookies are not sent by browsers.
    // Use Secure only when actually served over HTTPS (typically production).
    const isHttps = (process.env.NEXT_PUBLIC_BASE_URL || '').startsWith('https://');

    cookieStore.set('token', session, {
        httpOnly: true,
        secure: isHttps,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
};
