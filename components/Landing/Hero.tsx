import { H1, PLG } from '@/components/ui/typography';
import '@/css/themes/reui.css';

const LandingHeading = () => {
    return (
        <>
            <div
                className="relative h-[90vh] lg:h-[65vh] md:h-[65vh] sm:h-[90vh] flex 
            items-start pt-20 md:pt-0 lg:pt-0 md:items-center lg:items-center pl-6"
            >
                <div className="relative flex flex-col gap-4 text-[var(--color-midnight-core)]">
                    <H1>
                        Confidence in
                        <br /> Every Decision
                    </H1>
                    <PLG>legal AI with graph-vector context</PLG>
                </div>
            </div>
        </>
    );
};

export default LandingHeading;
