"use client"

import VerificationCodeCard from "@/components/Auth/EmailVerification/VerificationCodeCard";
import {verifyEmail} from "@/api/auth/verifyEmail";
import {redirect} from "next/navigation";
import {useState} from "react";

interface EmailVerificationClientProps {
    email: string;
}

const EmailVerificationClient = ({email}: EmailVerificationClientProps) => {
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
            setTimeout(() => {
                redirect(`/auth/signin`);
            }, 4000)
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
