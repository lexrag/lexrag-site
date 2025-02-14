"use client"

import {getGoogleAuthLink} from "@/api/auth/getGoogleAuthLink";

const GoogleAuthButton = () => {
    const googleButtonOnClick = async () => {
        const result = await getGoogleAuthLink()

        if (result.success) {
            window.location.replace(result.redirect_url);
        }
    }

    return (
        <a onClick={googleButtonOnClick} className="btn btn-light btn-sm justify-center">
            <img
                src="/media/icons/google.svg"
                className="size-3.5 shrink-0"
            />
            <span className="hidden sm:block">Use Google</span>
        </a>
    )
}

export default GoogleAuthButton;
