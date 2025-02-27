import PageTitle from "@/components/Layout/PageTitle";
import AllFeatures from "@/components/Features/FeaturesGrid";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Lexrag | Product Features',
    //TODO: add description
}


const Features = () => {
    return (
        <>  <section>
                    <PageTitle />
                    <AllFeatures/>
            </section>

        </>
    )
}

export default Features;
