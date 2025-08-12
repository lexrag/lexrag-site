"use client";

import Link from 'next/link';
import LiquidGlass from '@/components/liquid-glass';
import { getAppUrl } from '@/lib/app-config';
import '@/components/ui/css-variables.css';

const SigninButton = () => {
    const signinUrl = `${getAppUrl()}/auth/signin`;

    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <LiquidGlass
                    className=""
                    centered={false}
                    compact
                    displacementScale={50}
                    blurAmount={0.01}
                    saturation={130}
                    aberrationIntensity={2}
                    elasticity={0.05}
                    cornerRadius={100}
                    mode="standard"
                    padding="8px 16px"
                >
                    <Link
                        className="block text-axis-indigo text-base font-medium px-2 whitespace-nowrap"
                        href={signinUrl}
                        passHref
                    >
                        Sign In
                    </Link>
                </LiquidGlass>
            </div>
        </div>
    );
};

export default SigninButton;
