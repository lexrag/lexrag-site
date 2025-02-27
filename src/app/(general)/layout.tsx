import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";

const GeneralLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header className="sticky top-0 z-50 transition-colors" />
            
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default GeneralLayout;
