import { ReactNode, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import '@/css/globals.css';
import { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import ScrollTracker from '@/components/analytics/ScrollTracker';
import SegmentProvider from '@/components/analytics/SegmentProvider';

const instrumentSans = Instrument_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-instrument-sans',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | LEXRAG',
        default: 'LEXRAG - AI-Powered Legal Research',
    },
    description: 'Revolutionary legal research and analysis platform powered by GraphRAG technology',
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
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            </head>
            <body
                className={cn(
                    'antialiased text-base text-foreground bg-background font-instrument-sans',
                    instrumentSans.variable,
                )}
            >
                <ThemeProvider>
                    <SegmentProvider />
                    <ScrollTracker />
                    <Suspense>{children}</Suspense>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
