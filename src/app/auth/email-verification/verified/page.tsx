import SuccessCard from "@/components/Layout/SuccessCard";
import Link from "next/link";

const EmailVerifiedPage = () => {
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <SuccessCard>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                    Your email was verified
                </h3>

                <div className="text-2sm text-center text-gray-700 mb-7.5">
                    Your email has been successfully verified.<br/>Your account's security is our priority.
                </div>

                <div className="flex justify-center">
                    <Link className="btn btn-primary" href="/auth/signin">Sign in</Link>
                </div>
            </SuccessCard>
        </div>
    )
}

export default EmailVerifiedPage;
