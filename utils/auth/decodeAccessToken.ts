interface JwtPayload {
    sub: string;
    is_active: boolean;
    exp: number;
}

interface CacheEntry {
    payload: JwtPayload;
    cachedAt: number;
}

const CACHE_TTL_MS = 60 * 1000;
const serverCache = new Map<string, CacheEntry>();

export async function decrypt(token: string): Promise<JwtPayload | null> {
    if (!token) return null;
    const cached = serverCache.get(token);
    const now = Date.now();

    if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
        return cached.payload;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) return null;

    try {
        const response = await fetch(`${apiUrl}/auth/verify-token?token=${token}`);
        if (response.ok) {
            const payload = await response.json();
            serverCache.set(token, { payload, cachedAt: now });
            return payload;
        }
    } catch {
        console.log("Failed to verify session");
    }

    return null;
}

export function clearServerCache(token?: string) {
    if (token) {
        serverCache.delete(token);
    } else {
        serverCache.clear();
    }
}
