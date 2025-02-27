"use client"

import {redirect, useSearchParams} from "next/navigation";
import Loading from "@/app/loading";
import {googleSignIn} from "@/api/auth/googleSignIn";
import {useEffect} from "react";

const OauthCallback = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')

    const handleGoogleSignIn = async () => {
        const result = await googleSignIn({code})

        if (!result.success) {
            console.log("error", result.error)
        } else {
            redirect("/dashboard");
        }
    }

    useEffect(() => {
        if (code !== undefined) {
            handleGoogleSignIn()
        }
    }, [code]);

    return (
        <Loading />
    );
}

export default OauthCallback;
