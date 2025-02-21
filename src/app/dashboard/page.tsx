import Header from "@/components/Header/Header";
import {Metadata} from "next";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
    title: 'Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header />
            <Footer />
        </>
    )
}

export default Dashboard;
