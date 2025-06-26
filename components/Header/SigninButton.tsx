import Link from 'next/link';
import { Button } from '../ui/button';
import { ShinyButton } from "@/components/magicui/shiny-button";

const SigninButton = () => {
  return (
           
    <div className="flex items-center gap-8">
      <div className="tab">
        <Link href="/auth/signin" passHref>
          <ShinyButton className="bg-primary text-white px-5 py-3 border-none rounded-lg">
            Sign In
          </ShinyButton>
        </Link>
      </div>
    </div>
  );
};

export default SigninButton;

    // h-[2rem] whitespace-nowrap
             
            