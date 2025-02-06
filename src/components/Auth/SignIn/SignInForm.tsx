"use client";

import { useState, useRef } from "react";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import SubmitButton from "@/components/SubmitButton";
import { signIn } from "@/api/auth/signIn";
import {RiErrorWarningFill} from "react-icons/ri";
import Link from "next/link";
import {redirect} from "next/navigation";

const SignInForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
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
            redirect("/dashboard");
        }
    };

    const onShowPasswordClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div
                    className="flex items-center gap-2.5 border rounded-md p-3 border-danger-clarity bg-danger-light text-danger max-w-[250px]"
                    role="alert">
                    <RiErrorWarningFill color={'red'} size={0} className="w-[45px]" />
                    <div className="text-gray-700 text-sm">{error}</div>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Email</label>
                <label className="input">
                    <input
                        ref={emailRef}
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                        autoComplete="on"
                    />
                </label>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900">Password</label>
                    <Link className="text-2sm link shrink-0" href="#">
                        Forgot Password?
                    </Link>
                </div>

                <label className="input">
                    <input
                        ref={passwordRef}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        placeholder="Enter Password"
                        className="form-control"
                    />

                    <button className="btn btn-icon" type="button" onClick={onShowPasswordClick}>
                        {!showPassword ? <IoEyeSharp /> : <IoEyeOff />}
                    </button>
                </label>
            </div>

            <label className="checkbox-group">
                <input className="checkbox checkbox-sm" type="checkbox" name="remember" value="false" />
                <span className="checkbox-label">Remember me</span>
            </label>

            <SubmitButton text={"Sign In"} />
        </form>
    );
};

export default SignInForm
