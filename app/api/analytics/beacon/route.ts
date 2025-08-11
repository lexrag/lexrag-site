/* All comments in code strictly in English */
export const runtime = 'nodejs';

export async function POST(req: Request) {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) {
        // Sampled log to avoid noise when misconfigured
        if (Math.random() < 0.01) {
            console.error('[analytics/beacon] missing NEXT_PUBLIC_API_BASE_URL');
        }
        return new Response('', { status: 204 });
    }

    const backendUrl = `${apiBase.replace(/\/$/, '')}/analytics/beacon`;
    const body = await req.text(); // keep raw for pass-through

    const headers = new Headers();
    headers.set('content-type', 'application/json');

    // Forward cookies for session-based auth
    const cookies = req.headers.get('cookie');
    if (cookies) headers.set('cookie', cookies);

    // Forward Authorization if present (e.g., Bearer <token>)
    const auth = req.headers.get('authorization');
    if (auth) headers.set('authorization', auth);

    try {
        const res = await fetch(backendUrl, {
            method: 'POST',
            headers,
            body,
            // Server-to-server; CORS not needed here
        });
        // Mirror backend status; expected 204
        const text = await res.text();
        return new Response(text, { status: res.status });
    } catch (e) {
        // Sampled error logging to observe persistent backend failures
        if (Math.random() < 0.01) {
            console.error('[analytics/beacon] proxy error', e);
        }
        // Do not throw to client; swallow to avoid UI errors
        return new Response('', { status: 204 });
    }
}

