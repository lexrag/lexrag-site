import { cn } from '@/lib/utils';
import { H1, PLG } from '@/components/ui/typography';
import { DotPattern } from '@/components/magicui/dot-pattern';
import '@/components/ui/css-variables.css';

const LandingHeading = () => {
    return (
        <>
            <div className="relative h-[55vh] lg:h-[65vh] flex items-center pl-6">
                <div className="absolute inset-0"></div>
                {/* Dot Pattern */}
                <DotPattern
                    className={cn(
                        'opacity-80 text-sky-300 dark:text-sky-100',
                        '[mask-image:conic-gradient(from_180deg_at_center,transparent_45deg,white_180deg_285deg,transparent_45deg)]',
                    )}
                    width={20}
                    height={20}
                    cx={0}
                    cy={0}
                    cr={1}
                    glow={true}
                />

                <div className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40">
                    <div className="absolute inset-0 opacity-90"></div>
                </div>

                <div className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40">
                    <div className="absolute inset-0 opacity-90"></div>
                </div>

                <div className="relative flex flex-col gap-4 text-[var(--Brand-Primary-Midnight-Core)]">
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
