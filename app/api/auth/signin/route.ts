import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const apiBase =
            process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : '');
        if (!apiBase) {
            return NextResponse.json({ error: 'API base URL is not configured' }, { status: 500 });
        }

        const payload = await req.json();

        const upstream = await fetch(`${apiBase}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            // Forward cookies if ever needed; currently auth is handled on app/api servers
            // credentials: 'include',
        });

        const data = await upstream.json().catch(() => ({}));
        return NextResponse.json(data, { status: upstream.status });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
    }
}


