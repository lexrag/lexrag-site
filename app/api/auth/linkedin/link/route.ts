import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiBase =
            process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : '');
        if (!apiBase) {
            return NextResponse.json({ error: 'API base URL is not configured' }, { status: 500 });
        }
        const upstream = await fetch(`${apiBase}/auth/signin/linkedin`);
        const data = await upstream.json().catch(() => ({}));
        return NextResponse.json(data, { status: upstream.status });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
    }
}


