'use client';

import { FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function SocialAuthButtons() {
    const handleSocialAuth = (provider: string) => {
        console.log(`${provider} auth clicked`);
    };

    return (
        <div className="mt-4 flex gap-2">
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-[0.1] border-white/50 hover:border-white/70 shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px]
                        bg-transparent hover:bg-transparent 
                        transition-colors duration-200 text-white"
                onClick={() => handleSocialAuth('google')}
            >
                <FaGoogle size={20} className="text-white" />
                Google
            </Button>
            <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-[0.1] border-white/50 hover:border-white/70 shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px]
                        bg-transparent hover:bg-transparent 
                        transition-colors duration-200 text-white"
                onClick={() => handleSocialAuth('linkedin')}
            >
                <FaLinkedinIn size={20} className="text-white" />
                LinkedIn
            </Button>
        </div>
    );
}
