"use client"

import {IoEyeOff, IoEyeSharp} from "react-icons/io5";
import SubmitButton from "@/components/SubmitButton";
import {useRef, useState} from "react";
import {redirect} from "next/navigation";
import {RiErrorWarningFill} from "react-icons/ri";
import {signUp} from "@/api/auth/signUp";

const SignUpForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

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
                    className="flex items-center justify-center gap-2.5 border rounded-md p-3 border-danger-clarity bg-danger-light text-danger max-w-[370px]"
                    role="alert">
                    <RiErrorWarningFill color={'red'} size={0} className="w-[45px]"/>
                    <div className="text-gray-700 text-sm">{error}</div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900">First Name</label>
                    <label className="input">
                        <input
                            name="firstName"
                            ref={firstNameRef}
                            autoComplete="on"
                            placeholder="Alex"
                            className="form-control bg-transparent"
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900">Last Name</label>
                    <label className="input">
                        <input
                            name="lastName"
                            ref={lastNameRef}
                            autoComplete="on"
                            placeholder="Smith"
                            className="form-control bg-transparent"
                        />
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Email</label>
                <label className="input">
                    <input
                        name="email"
                        ref={emailRef}
                        autoComplete="off"
                        placeholder="email@email.com"
                        className="form-control bg-transparent"
                    />
                </label>
            </div>

            <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Password</label>
                <label className="input">
                    <input
                        ref={passwordRef}
                        name="password"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        className="form-control bg-transparent"
                    />

                    <button onClick={onShowPasswordClick} className="btn btn-icon" type="button">
                        {!showPassword ? <IoEyeSharp/> : <IoEyeOff/>}
                    </button>
                </label>
            </div>

            <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Confirm Password</label>
                <label className="input">
                    <input
                        ref={secondPasswordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter Password"
                        autoComplete="off"
                        name="changepassword"
                        className="form-control bg-transparent"
                    />

                    <button onClick={onShowPasswordClick} className="btn btn-icon" type="button">
                        {!showPassword ? <IoEyeSharp/> : <IoEyeOff/>}
                    </button>
                </label>
            </div>

            <label className="checkbox-group">
                <input
                    className="checkbox checkbox-sm"
                    type="checkbox"
                    name="acceptTerms"
                    value="false"
                />
                <span className="checkbox-label">
                        I accept&nbsp;
                    <a className="text-2sm link" href="/metronic/tailwind/react/demo7/auth/signup">
                            Terms &amp; Conditions
                        </a>
                    </span>
            </label>

            <SubmitButton text={"Sign Up"}/>
        </form>
    )
}

export default SignUpForm;
