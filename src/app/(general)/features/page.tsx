import PageTitle from "@/components/Layout/PageTitle";
import ProductFeatures from "@/components/Features/FeaturesGrid";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Lexrag | Product Features',
    //TODO: add description
}


const Features = () => {
    return (
        <>  <section>
                    <PageTitle />
                    <ProductFeatures 
                    gridClassName="grid grid-cols-1 md:grid-cols-4 lg:pr-[14%] lg:pl-[14%] gap-4 min-h-[230px]"
                    showDescription={true}
                    showSideBadges={false} 
                    showBottomBadges={true}
                    maxHeightBeforeShowAll={500} 
                />
            </section>

        </>
    )
}

export default Features;
