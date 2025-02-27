import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/auth/decodeAccessToken";

const protectedRoutes = ["/dashboard", "/chat", "/profile"];
const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/features"];

const middleware = async (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

    const cookiesStore = await cookies(); 
    const session = cookiesStore.get("session")?.value;

    const jwtPayload = await decrypt(session);

    const response = NextResponse.next();
    if (jwtPayload?.is_active) {
        response.cookies.set("isAuthenticated", "true", { httpOnly: false });
    } else {
        response.cookies.set("isAuthenticated", "false", { httpOnly: false });
    }

    if (isProtectedRoute && !jwtPayload?.is_active) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    if (isPublicRoute) {
        return response;
    }

    if (jwtPayload?.is_active && (path === "/auth/signin" || path === "/auth/signup")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return response;
};

export default middleware;