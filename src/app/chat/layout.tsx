import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";

const ChatLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen ">

            <Header className="fixed top-0 z-10 dark:bg-coal-500 light:bg-white transition-colors" />
            <main className="flex-grow mt-20">
                {children}
            </main>

            <div className="fixed bottom-0 w-full light:bg-white dark:bg-[#0D0E12]">
                <Footer />
            </div>
        </div>
    );
};

export default ChatLayout;
