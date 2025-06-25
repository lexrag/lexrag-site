import Link from 'next/link';
import { AuroraText } from "@/components/magicui/aurora-text";
import CurveDown from '@/components/Landing/CurveDown';
import { Button } from '../ui/button';

const LandingHeading = () => {
  return (
    <>
      <div className="relative h-[55vh] lg:h-[65vh] flex justify-center items-center">
        <div className="absolute inset-0 bg-[#13263C]"></div>

        <div
          className="absolute inset-0 bg-no-repeat bg-contain bg-bottom"
          style={{
            backgroundImage: 'url(/media/images/singapore_1.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundBlendMode: 'multiply',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(19, 38, 60, 0.9) 0%, rgba(19, 38, 60, 0.95) 100%)',
            }}
          ></div>
        </div>

        <div className="relative text-center">
          <h1
            className="text-white tracking-wide font-semibold text-2xl md:text-4xl mb-[20px] transition-all duration-300"
            style={{
              lineHeight: '50px',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            <AuroraText>
              Confidence in Every Decision
            </AuroraText>
            <br />
            legal AI with graph-vector context &nbsp;
          </h1>

          <Link href="/auth/signin" passHref>
            <Button className="transition-transform duration-300 hover:scale-105 shadow-lg">
              Try Lexrag
            </Button>
          </Link>
        </div>
      </div>
      <CurveDown />
    </>
  );
};

export default LandingHeading;
