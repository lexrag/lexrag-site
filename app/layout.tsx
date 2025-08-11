import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import '@/css/globals.css';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={cn('antialiased flex h-full text-base text-foreground bg-background', inter.className)}>
                <ThemeProvider>
                    <Suspense>{children}</Suspense>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
