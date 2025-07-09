import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/utils/auth/decodeAccessToken';

const protectedRoutes = ['/dashboard', '/chat', '/profile'];
const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/features'];

const middleware = async (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    const cookiesStore = await cookies();
    const session = cookiesStore.get('token')?.value;

    const jwtPayload = await decrypt(session || '');

    const response = NextResponse.next();

    if (jwtPayload?.is_active) {
        response.cookies.set('isAuthenticated', 'true', { httpOnly: false });
        response.cookies.set('token', session || '', { httpOnly: false });
    } else {
        response.cookies.set('isAuthenticated', 'false', { httpOnly: false });
        response.cookies.set('token', '', { httpOnly: false, maxAge: 0 });
    }

    if (isProtectedRoute && jwtPayload?.sub && !jwtPayload.is_active) {
        return NextResponse.redirect(new URL(`/auth/email-verification/${jwtPayload?.sub}`, req.url));
    }

    if (isProtectedRoute && !jwtPayload?.sub) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    if (isPublicRoute) {
        return response;
    }

    if (jwtPayload?.is_active && (path === '/auth/signin' || path === '/auth/signup')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return response;
};

export default middleware;
