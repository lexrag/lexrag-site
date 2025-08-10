import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';

const SigninButton = () => {
    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <Link href="/auth/signin" passHref>
                    <ShinyButton className="bg-primary text-white border-none rounded-lg py-2 px-4 transition-transform duration-300 hover:scale-105 shadow-lg">
                        Sign In
                    </ShinyButton>
                </Link>
            </div>
        </div>
    );
};

export default SigninButton;
