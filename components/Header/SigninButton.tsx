'use client';

import Link from 'next/link';
import { getAppUrl } from '@/lib/app-config';
import '@/components/ui/css-variables.css';

const SigninButton = () => {
    const signinUrl = `${getAppUrl()}/auth/signin`;

    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <Link
                    className="block text-axis-indigo text-base font-medium py-2 px-10 rounded-full shadow-[0_0_8.88px_0_rgba(0,0,0,0.1)] backdrop-blur-[8.88px] hover:border-transparent border-t border-[#fff] whitespace-nowrap transition-all hover:bg-phase-green"
                    href={signinUrl}
                    passHref
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default SigninButton;
