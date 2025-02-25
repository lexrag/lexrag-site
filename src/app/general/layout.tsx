import Header from "@/components/Header/Header";
import Footer from "@/components/Layout/Footer";

const GeneralLayout = ({children}) => {
    return (
        <main className="pl-[15%] pr-[15%]">
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default GeneralLayout;
