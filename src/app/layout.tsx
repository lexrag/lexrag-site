import "../styles/globals.css";
import Providers from "@/app/providers";
import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";

export const metadata = {
    title: 'Lexrag',
};


const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/media/icons/favicon.svg" sizes="any" />
            </head>
            <body className="">
                <Providers>
                    
                    <main className="flex-grow">{children}</main>
                    
                </Providers>
                
            </body>
        </html>
    );
};

export default GeneralLayout;
