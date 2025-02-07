import Header from "@/components/Header/Header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header />
        </>
    )
}

export default Dashboard;
