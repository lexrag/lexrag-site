"use client"

import {InputProps} from "@/components/Layout/Input";
import Link from "next/link";
import {IoEyeOff, IoEyeSharp} from "react-icons/io5";
import {useState} from "react";

interface PasswordInputProps extends InputProps {
    type: "signin" | "signup"
}

const PasswordInput = (props: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const onShowPasswordClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex flex-col gap-1">
            {props.type === "signin" && (
                <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900">{props.label}</label>
                    <Link className="text-2sm link shrink-0" href="/auth/reset-password">
                        Forgot Password?
                    </Link>
                </div>
            )}

            {props.type === "signup" && (
                <label className="form-label text-gray-900">{props.label}</label>
            )}

            <label className="input">
                <input
                    ref={props.ref}
                    name={props.name}
                    placeholder={props.placeholder}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    autoComplete="on"
                />

                <button className="btn btn-icon" type="button" onClick={onShowPasswordClick}>
                    {!showPassword ? <IoEyeSharp/> : <IoEyeOff/>}
                </button>
            </label>
        </div>
    )
}

export default PasswordInput;
