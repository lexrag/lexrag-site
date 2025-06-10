"use client";

import { useState, useRef } from "react";
import SubmitButton from "@/components/SubmitButton";
import { signIn } from "@/api/auth/signIn";
import {RiErrorWarningFill} from "react-icons/ri";
import {redirect} from "next/navigation";
import Input from "@/components/Layout/Input";
import PasswordInput from "@/components/Layout/PasswordInput";

const SignInForm = () => {
    const [error, setError] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const email = emailRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";

        const result = await signIn({ email, password });

        if (!result.success) {
            setError(result.error);
        } else {
            redirect("/chat/new");
        }
    };

    return (
        <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div
                    className="flex items-center gap-2.5 border rounded-md p-3 border-danger-clarity bg-danger-light text-danger"
                    role="alert">
                    <RiErrorWarningFill color={'red'} size={0} className="w-[45px]" />
                    <div className="text-gray-700 text-sm">{error}</div>
                </div>
            )}

            <Input label="Email" name="email" placeholder="Enter your email" ref={emailRef} />
            <PasswordInput type="signin" label="Password" name="password" placeholder="Enter Password" ref={passwordRef} />

            <label className="checkbox-group">
                <input className="checkbox checkbox-sm" type="checkbox" name="remember" value="false" />
                <span className="checkbox-label">Remember me</span>
            </label>

            <SubmitButton text={"Sign In"} />
        </form>
    );
};

export default SignInForm
