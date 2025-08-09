'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { page } from '@/lib/analytics';

export default function PageTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    page();
  }, [pathname, search]);

  return null;
}
