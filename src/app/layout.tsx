import "../styles/globals.css";
import Providers from "@/app/providers";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Lexrag',
    // description: '...', TODO: add description
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/media/icons/favicon.svg" sizes="any" />
            </head>
            <body className="min-h-[100vh]">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout;
