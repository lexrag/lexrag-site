import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/css/globals.css';
import '@/components/keenicons/assets/styles.css';
import { Metadata, Viewport } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { UserProvider } from '@/providers/user-provider';
import { SegmentAnalyticsProvider } from '@/providers/segment-analytics-provider';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Lexrag',
        default: 'Lexrag',
    },
    other: {
        'google-site-verification': 'IKxx-FRONvplOxvRULlgKDdlKdWD4MZFsDr7HrLtKUM',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="h-full" suppressHydrationWarning>
            <body className={cn('antialiased flex h-full text-base text-foreground bg-background', inter.className)}>
                <QueryProvider>
                    <ThemeProvider>
                        <TooltipsProvider>
                            <UserProvider>
                                <SegmentAnalyticsProvider>
                                    <PageViewTracker />
                                    <Suspense>{children}</Suspense>
                                    <Toaster />
                                </SegmentAnalyticsProvider>
                            </UserProvider>
                        </TooltipsProvider>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
