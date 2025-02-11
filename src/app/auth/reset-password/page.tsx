"use client"

import {useRef, useState} from "react";
import EmailFormCard from "@/components/Auth/ResetPassword/EmailFormCard";
import {sendVerificationCode} from "@/api/auth/sendVerificationCode";
import EmailVerificationClient from "@/components/Auth/EmailVerification/EmailVerificationClient";
import {createAccessToken} from "@/utils/auth/createAccessToken";
import ResetPasswordFormCard from "@/components/Auth/ResetPassword/ResetPasswordFormCard";
import {resetPassword} from "@/api/auth/resetPassword";
import {redirect} from "next/navigation";

enum ResetPasswordSteps {
    emailForm = "emailForm",
    codeVerification = "codeVerification",
    resetPassword = "resetPassword",
}

const ResetPasswordPage = () =>  {
    const [currentStep, setCurrentStep] = useState<ResetPasswordSteps>(ResetPasswordSteps.emailForm);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Step 1: User provides his email. We send verification code.
    const [email, setEmail] = useState<string>("");

    const onEmailFormSubmit = async () => {
        if (email !== null && email !== "") {
            await sendVerificationCode(email);
            setCurrentStep(ResetPasswordSteps.codeVerification);
        }
    }

    // Step 2: User provides the code that was sent. We check for validity and generate a token.
    // We decrypt the token on server side while changing the password to guarantee security.
    const onSuccessfulVerification = async () => {
        if (email !== null && email !== "") {
            setAccessToken(await createAccessToken({sub: email}));
            setCurrentStep(ResetPasswordSteps.resetPassword);
        }
    }

    // Step 3: User provides the new password.
    // We send all data to the server (email, access token and new password)
    // Server validates the token, check if user with such email exists and finally change the password
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const secondNewPasswordRef = useRef<HTMLInputElement>(null);

    const handlePasswordResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const newPassword = newPasswordRef.current?.value
        const secondNewPassword = secondNewPasswordRef.current?.value;

        if (!newPassword || !secondNewPassword) {
            setError("Passwords don't match");
        }

        const result = await resetPassword({
            email,
            token: accessToken,
            new_password: newPassword,
        })

        if (!result.success) {
            setError(result.error);
        } else {
            redirect("/auth/reset-password/changed");
        }
    }


    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            {currentStep === ResetPasswordSteps.emailForm && (
                <EmailFormCard email={email} setEmail={setEmail} onSubmit={onEmailFormSubmit} />
            )}

            {currentStep === ResetPasswordSteps.codeVerification && (
                <EmailVerificationClient email={email} onSuccessfulVerification={onSuccessfulVerification} />
            )}

            {currentStep === ResetPasswordSteps.resetPassword && (
                <ResetPasswordFormCard handleSubmit={handlePasswordResetSubmit} passwordRef={newPasswordRef} secondPasswordRef={secondNewPasswordRef} error={error} />
            )}
        </div>
    )
}

export default ResetPasswordPage;
