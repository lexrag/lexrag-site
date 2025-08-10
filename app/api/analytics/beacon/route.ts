import { NextResponse } from 'next/server';

// Proxy frontend analytics beacons to backend analytics endpoint.
// Accepts JSON: { event: string, properties: object }
export async function POST(request: Request) {
    try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBase) {
            return NextResponse.json({ error: 'API base URL is not configured' }, { status: 500 });
        }

        let payload: any;
        try {
            payload = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }

        if (!payload || typeof payload.event !== 'string' || !payload.event) {
            return NextResponse.json({ error: 'Missing or invalid "event"' }, { status: 400 });
        }

        // Pass-through to backend beacon endpoint
        const backendUrl = `${apiBase.replace(/\/$/, '')}/analytics/beacon`;
        const resp = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            // Keepalive not supported on server fetch; server has stable network
        });

        if (!resp.ok) {
            const text = await resp.text();
            return NextResponse.json({ error: 'Upstream error', details: text }, { status: resp.status });
        }

        // Return upstream response as-is if JSON, otherwise ok
        const contentType = resp.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await resp.json();
            return NextResponse.json(data, { status: resp.status });
        }
        return new NextResponse(null, { status: resp.status });
    } catch (err: any) {
        return NextResponse.json({ error: 'Unexpected error', details: String(err?.message || err) }, { status: 500 });
    }
}


