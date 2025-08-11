type Props = Record<string, unknown>;

export function sendAnalytics(event: string, properties: Props = {}) {
    const payload = {
        event,
        properties,
    };
    const url = '/api/analytics/beacon';
    let json = '';
    try {
        json = JSON.stringify(payload);
    } catch {
        return;
    }

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        try {
            const blob = new Blob([json], { type: 'application/json' });
            const ok = (navigator as any).sendBeacon(url, blob);
            if (ok) return;
        } catch {
        }
    }

    fetch(url, {
        method: 'POST',
        body: json,
        headers: { 'content-type': 'application/json' },
        keepalive: true,
    }).catch(() => {
    });
}


