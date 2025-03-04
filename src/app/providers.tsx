"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

// Dynamically import GlobalInit to prevent hydration issues
const GlobalInit = dynamic(() => import("@/components/GlobalInit"), { ssr: false });

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GlobalInit />
            {children}
        </ThemeProvider>
    );
};

export default Providers;