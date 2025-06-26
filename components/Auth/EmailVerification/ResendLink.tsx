'use client';

import { useEffect, useState } from 'react';
import { sendVerificationCode } from '@/api/auth/sendVerificationCode';

interface ResendLinkProps {
    email: string;
}

const ResendLink = ({ email }: ResendLinkProps) => {
    const RESEND_DELAY = Number.parseInt(process.env.NEXT_PUBLIC_VERIFICATION_CODE_TTL);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const storedTimestamp = localStorage.getItem('resendDisabledUntil');
        if (storedTimestamp) {
            const timeDiff = Math.ceil((parseInt(storedTimestamp) - Date.now()) / 1000);
            if (timeDiff > 0) {
                setTimeLeft(timeDiff);
            } else {
                localStorage.removeItem('resendDisabledUntil');
            }
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleResend = async () => {
        const result = await sendVerificationCode(email);

        if (!result.success) {
            return;
        }

        const unlockTime = Date.now() + RESEND_DELAY * 1000;
        localStorage.setItem('resendDisabledUntil', unlockTime.toString());
        setTimeLeft(RESEND_DELAY);
    };

    return (
        <a
            onClick={handleResend}
            className={
                timeLeft > 0
                    ? 'text-xs font-medium pointer-events-none cursor-default'
                    : 'text-xs font-medium link pointer-events-auto cursor-pointer'
            }
        >
            {timeLeft > 0 && <span>{timeLeft}s </span>}
            Resend
        </a>
    );
};

export default ResendLink;
