'use client';

import { FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function SocialAuthButtons() {
    const startGoogle = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!API_BASE) return;
            const res = await fetch(`${API_BASE}/auth/signin/google`);
            const data = await res.json();
            const redirect = data?.redirect_url || data?.auth_url;
            if (res.ok && redirect) {
                window.location.href = redirect;
            }
        } catch {}
    };

    const startLinkedIn = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!API_BASE) return;
            const res = await fetch(`${API_BASE}/auth/signin/linkedin`);
            const data = await res.json();
            const redirect = data?.auth_url || data?.redirect_url;
            if (res.ok && redirect) {
                window.location.href = redirect;
            }
        } catch {}
    };

    return (
        <div className="mt-4 flex gap-2">
            <Button
                variant="outline"
                className="group w-full flex items-center justify-center gap-2 border-[0.1] border-white/50 hover:border-white/70 shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px]
                        bg-transparent hover:bg-transparent 
                        transition-colors duration-200 text-white hover:scale-105 hover:text-emerald-500"
                onClick={startGoogle}
            >
                <FaGoogle size={20} className="text-white group-hover:text-emerald-500" />
                Google
            </Button>
            <Button
                variant="outline"
                className="group w-full flex items-center justify-center gap-2 border-[0.1] border-white/50 hover:border-white/70 shadow-[0_0_8.881px_0_rgba(0,0,0,0.1)] rounded-[73.553px]
                        bg-transparent hover:bg-transparent 
                        transition-colors duration-200 text-white hover:scale-105 hover:text-emerald-500"
                onClick={startLinkedIn}
            >
                <FaLinkedinIn size={20} className="text-white group-hover:text-emerald-500" />
                LinkedIn
            </Button>
        </div>
    );
}
