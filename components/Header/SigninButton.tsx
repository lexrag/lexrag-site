import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';
import '@/components/ui/css-variables.css';

const SigninButton = () => {
    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <Link href="/auth/signin" passHref>
                    <ShinyButton className="border-[0.1] shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px] bg-[rgba(255,255,255,0.1)] hover:bg-[var(--Brand-Primary-Phase-Green)] transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]">
                        Sign In
                    </ShinyButton>
                </Link>
            </div>
        </div>
    );
};

export default SigninButton;
