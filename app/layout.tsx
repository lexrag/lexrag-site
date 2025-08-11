import { ReactNode, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import '@/css/globals.css';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';

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
                <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet" />
            </head>
            <body className={cn('antialiased flex h-full text-base text-foreground bg-background font-instrument-sans')}>
                <ThemeProvider>
                    <Suspense>{children}</Suspense>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
