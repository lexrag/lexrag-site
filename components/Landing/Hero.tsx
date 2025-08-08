import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AuroraText } from '@/components/magicui/aurora-text';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { H1 } from '@/components/ui/typography';

const LandingHeading = () => {
    return (
        <>
            <div className="relative h-[55vh] lg:h-[65vh] flex justify-center items-center">
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

                <div
                    className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40"
                >
                    <div
                        className="absolute inset-0 opacity-90"
                    ></div>
                </div>

        <div
          className="absolute inset-0 bg-no-repeat bg-contain bg-bottom opacity-40"
        >
          <div
            className="absolute inset-0 opacity-90"
          ></div>
        </div>

<div className="relative text-center flex flex-col items-center justify-center">
  <H1
    className=""
    style={{
      lineHeight: '70px',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <AuroraText className="text-4xl md:text-5xl font-bold tracking-tight">
      Confidence in Every Decision
    </AuroraText>
    <br />
    <span className="text-white tracking-wide font-semibold text-4xl md:text-4xl mb-5 transition-all duration-300">
      legal AI with graph-vector context
    </span>
  </H1>

  <Link href="/chat/new" passHref>
    <div className="mt-4">
      <ShinyButton className="bg-primary text-white px-5 py-3 border-none rounded-lg py-2 px-4 transition-transform duration-300 hover:scale-105 shadow">
        Try LEXRAG
      </ShinyButton>
    </div>
  </Link>
</div>
      </div>
    </>
  );
};

export default LandingHeading;
