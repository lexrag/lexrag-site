import "../styles/globals.css";
import Providers from "@/app/providers";

const RootLayout = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="pl-[18%] pr-[18%] min-h-[100vh]">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout;
