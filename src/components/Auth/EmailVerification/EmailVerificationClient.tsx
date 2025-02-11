"use client"

import VerificationCodeCard from "@/components/Auth/EmailVerification/VerificationCodeCard";
import {verifyEmail} from "@/api/auth/verifyEmail";
import {useState} from "react";
import {redirect} from "next/navigation";

interface EmailVerificationClientProps {
    email: string;
    onSuccessfulVerification?: () => void;
}

const EmailVerificationClient = ({email, onSuccessfulVerification}: EmailVerificationClientProps) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState("");

    const handleSignUpVerificationCodeSubmit = async () => {
        const result = await verifyEmail({
            email,
            code: verificationCode
        })

        if (!result.success) {
            setError(result.error);
        } else {
            setSuccess(true)

            if (onSuccessfulVerification === undefined) {
                setTimeout(() => {
                    redirect('/auth/email-verification/verified');
                }, 2000)
            } else {
                setTimeout(() => {
                    onSuccessfulVerification();
                }, 2000)
            }
        }
    }

    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <VerificationCodeCard
                email={email}
                handleSubmit={handleSignUpVerificationCodeSubmit}
                error={error}
                success={success}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
            />
        </div>
    )
}

export default EmailVerificationClient;
