import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";

const GeneralLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen ">

            <Header className="fixed top-0 z-10 dark:bg-coal-500 light:bg-white transition-colors pl-[16%] pr-[16%]" />
            <main className="flex-grow mt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default GeneralLayout;
