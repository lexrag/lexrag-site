"use client"

import SubmitButton from "@/components/SubmitButton";
import {useEffect, useRef, useState} from "react";
import {redirect} from "next/navigation";
import {RiErrorWarningFill} from "react-icons/ri";
import {signUp} from "@/api/auth/signUp";
import Input from "@/components/Layout/Input";
import PasswordInput from "@/components/Layout/PasswordInput";
import {sendVerificationCode} from "@/api/auth/sendVerificationCode";
import Link from "next/link";

const SignUpForm = () => {
    const [error, setError] = useState<string | null>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);
    const [termsConfirmed, setTermsConfirmed] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!termsConfirmed) {
            setError("Please confirm our Terms & Conditions to use the service");
            return
        }

        const first_name = firstNameRef.current?.value.trim() || "";
        const last_name = lastNameRef.current?.value.trim() || "";
        const email = emailRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        const secondPassword = secondPasswordRef.current?.value.trim() || "";

        if (password !== secondPassword) {
            setError("Password don't match");
            return
        }

        const result = await signUp({ first_name, last_name, email, password });

        if (!result.success) {
            setError(result.error);
            return
        }

        const verificationCodeResult = await sendVerificationCode(email)

        if (!verificationCodeResult.success) {
            setError(verificationCodeResult.error);
        } else {
            redirect(`/auth/email-verification/${email}`)
        }
    };

    return (
        <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div
                    className="flex items-center justify-center gap-2.5 border rounded-md p-3 border-danger-clarity bg-danger-light text-danger"
                    role="alert">
                    <RiErrorWarningFill color={'red'} size={0} className="w-[45px]"/>
                    <div className="text-gray-700 text-sm">{error}</div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-5">
                <Input label="First Name" name="firstName" placeholder="Alex" ref={firstNameRef} />
                <Input label="Last Name" name="lastName" placeholder="Smith" ref={lastNameRef} />
            </div>

            <Input label="Email" name="email" placeholder="email@email.com" ref={emailRef} />
            <PasswordInput type="signup" label="Password" name="password" placeholder="Enter Password" ref={passwordRef} />
            <PasswordInput type="signup" label="Confirm Password" name="changepassword" placeholder="Re-enter Password" ref={secondPasswordRef} />

            <label className="checkbox-group">
                <input
                    className="checkbox checkbox-sm"
                    type="checkbox"
                    name="acceptTerms"
                    value={termsConfirmed.toString()}
                    onChange={(e) => setTermsConfirmed(e.target.checked)}
                />
                <span className="checkbox-label">
                    I accept&nbsp;
                    <Link className="text-2sm link" href="/terms-and-conditions">
                        Terms &amp; Conditions
                    </Link>
                </span>
            </label>

            <SubmitButton text={"Sign Up"}/>
        </form>
    )
}

export default SignUpForm;
