'use client';

// All comments in code strictly in English
import { PropsWithChildren, useEffect, useState } from 'react';

export function ClientOnly({ children }: PropsWithChildren) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return <>{children}</>;
}
