'use server';

import { cookies } from 'next/headers';

export const setSession = async (session: string) => {
  const expiresAt = new Date(
    Date.now() +
      parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRATION_MINUTES) * 60 * 1000,
  );
  const cookieStore = await cookies();

  cookieStore.set('token', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
};
