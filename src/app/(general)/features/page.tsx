import PageTitle from "@/components/Layout/PageTitle";
import FeaturesGrid from "@/components/Features/FeaturesGrid";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Lexrag | Product Features',
    //TODO: add description
}


const Features = () => {
    return (
        <>  <section>
                    <PageTitle />
                    <FeaturesGrid/>
            </section>

        </>
    )
}

export default Features;
