import Link from 'next/link';
import { Button } from '../ui/button';

const SigninButton = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="tab">
        <Link href="/auth/signin" passHref>
          <Button className="h-[2rem] whitespace-nowrap">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default SigninButton;
