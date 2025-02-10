import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {decrypt} from "@/utils/auth/decodeAccessToken";

const protectedRoutes = [
    "/dashboard", '/chat'
]

const publicRoutes = [
    "/auth/signin", "/auth/signup",
]

const middleware = async (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookiesStore = await cookies();
    const session = cookiesStore.get("session")?.value

    const jwtPayload = await decrypt(session)

    if (isProtectedRoute && !jwtPayload?.sub) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    if (isPublicRoute && jwtPayload?.sub) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next()
}

export default middleware;
