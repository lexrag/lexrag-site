'use client';

import { FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

export default function SocialAuthButtons() {
    const handleSocialAuth = (provider: string) => {
        console.log(`${provider} auth clicked`);
    };

    return (
        <div className="mt-4 flex gap-2">
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-[0.1] shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px] 
                        bg-[rgba(255,255,255,0.1)] hover:bg-[var(--Brand-Primary-Phase-Green)] 
                        transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]"
                onClick={() => handleSocialAuth('google')}
            >
                <FcGoogle size={20} />
                Google
            </Button>
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-[0.1] shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px] 
                        bg-[rgba(255,255,255,0.1)] hover:bg-[var(--Brand-Primary-Phase-Green)] 
                        transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]"
                onClick={() => handleSocialAuth('linkedin')}
            >
                <FaLinkedin size={20} color="#0A66C2" />
                LinkedIn
            </Button>
        </div>
    );
}
