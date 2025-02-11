"use client"

import "./VerificationInput.css"
import Card from "@/components/Layout/Card";
import VerificationInput from "react-verification-input";
import {useEffect, useState} from "react";
import {RiErrorWarningFill} from "react-icons/ri";
import {IoCheckmarkCircle} from "react-icons/io5";
import ResendLink from "@/components/Auth/EmailVerification/ResendLink";

interface VerificationCodeCardProps {
    email: string
    handleSubmit: () => void
    error: string
    success: boolean
    verificationCode: string
    setVerificationCode: (code: string) => void
}

const VerificationCodeCard = (props: VerificationCodeCardProps) => {
    useEffect(() => {
        if (props.verificationCode.length === 6) {
            props.handleSubmit()
        }
    }, [props.verificationCode]);

    return (
        <Card>
            <h3 className="text-lg font-medium text-gray-900 text-center m-3">
                Check your email
            </h3>

            {props.error && (
                <div className="flex justify-center">
                    <div
                        className="flex items-center justify-center gap-2.5 border rounded-md p-3 mb-2 mt-2 border-danger-clarity bg-danger-light text-danger"
                        role="alert">
                        <RiErrorWarningFill color={'red'} size={0} className="w-[45px]"/>
                        <div className="text-gray-700 text-sm">{props.error}</div>
                    </div>
                </div>
            )}

            {props.success && (
                <div className="flex justify-center">
                    <div
                        className="flex items-center justify-center gap-2.5 border rounded-md p-3 mb-2 mt-2 border-success-clarity bg-success-light text-success"
                        role="alert">
                        <IoCheckmarkCircle color={'green'} size={0} className="w-[45px]"/>
                        <div className="text-gray-700 text-sm">Code was successfully submitted!</div>
                    </div>
                </div>
            )}

            <div className="text-2sm text-center text-gray-700 mb-7.5">
                Please enter the verification code sent to your email&nbsp;
                <a href="#" className="text-2sm text-gray-800 font-medium hover:text-primary-active">
                    {props.email}
                </a>

                <br/>
                to proceed. Thank you.
            </div>

            <div className="flex justify-center mb-5">
                <VerificationInput
                    value={props.verificationCode}
                    onChange={props.setVerificationCode}
                    classNames={{
                        container: "verification-input-container",
                        character: "character",
                        characterInactive: "character--inactive",
                        characterSelected: "character--selected",
                        characterFilled: "character--filled",
                    }}
                />
            </div>

            <div className="flex items-center justify-center gap-1">
                <span className="text-xs text-gray-600">Didn’t receive an email?</span>
                <ResendLink email={props.email} />
            </div>
        </Card>
    )
}

export default VerificationCodeCard;
