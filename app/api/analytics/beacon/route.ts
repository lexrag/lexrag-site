/* All comments in code strictly in English */
export const runtime = 'nodejs';

export async function POST(req: Request) {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) {
        // Sampled log to avoid noise when misconfigured
        if (Math.random() < 0.01) {
            console.error('[analytics/beacon] missing NEXT_PUBLIC_API_BASE_URL');
        }
        // 204 responses must not include a body
        return new Response(null, { status: 204 });
    }

    const backendUrl = `${apiBase.replace(/\/$/, '')}/analytics/beacon`;
    const body = await req.text(); // keep raw for pass-through

    const headers = new Headers();
    headers.set('content-type', 'application/json');

    // Forward cookies for session-based auth
    const cookieHeader = req.headers.get('cookie') || '';
    if (cookieHeader) headers.set('cookie', cookieHeader);

    // Forward Authorization if present (e.g., Bearer <token>)
    let auth = req.headers.get('authorization');

    // If Authorization is missing, try to pull the JWT from cookie `token`
    // and synthesize Authorization so backend can attach identity to events
    if (!auth && cookieHeader) {
        const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
        if (match && match[1]) {
            try {
                const raw = decodeURIComponent(match[1]);
                if (raw) {
                    auth = `Bearer ${raw}`;
                }
            } catch {
                // ignore malformed cookie
            }
        }
    }
    if (auth) headers.set('authorization', auth);

    try {
        const res = await fetch(backendUrl, {
            method: 'POST',
            headers,
            body,
            // Server-to-server; CORS not needed here
        });
        // Mirror backend status; expected 204. 204 must not include a body.
        if (res.status === 204) {
            return new Response(null, { status: 204 });
        }
        const text = await res.text();
        return new Response(text, { status: res.status });
    } catch (e) {
        // Sampled error logging to observe persistent backend failures
        if (Math.random() < 0.01) {
            console.error('[analytics/beacon] proxy error', e);
        }
        // Do not throw to client; swallow to avoid UI errors. 204 must not include a body.
        return new Response(null, { status: 204 });
    }
}

