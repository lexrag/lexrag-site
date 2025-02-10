import EmailVerificationClient from "@/components/Auth/EmailVerification/EmailVerificationClient";

const EmailVerification = async ({params}) => {
    const email = decodeURIComponent((await params).email);

    return (
        <EmailVerificationClient email={email} />
    )
}

export default EmailVerification;
