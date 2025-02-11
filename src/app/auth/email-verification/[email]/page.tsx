import EmailVerificationClient from "@/components/Auth/EmailVerification/EmailVerificationClient";
import {redirect} from "next/navigation";

const EmailVerificationPage = async ({params}) => {
    const email = decodeURIComponent((await params).email);

    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <EmailVerificationClient email={email} />
        </div>
    )
}

export default EmailVerificationPage;
