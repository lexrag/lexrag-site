import Link from "next/link";
import GoogleAuthButton from "@/components/Auth/GoogleAuth/GoogleAuthButton";

const SignUpHeader = () => {
    return (
        <>
            <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                    Sign up
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-center font-medium">
                    <span className="text-2sm text-gray-600 me-1.5">Already have an Account ?</span>
                    <Link className="text-2sm link" href="/auth/signin">Sign In</Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                <GoogleAuthButton />

                <a href="#" className="btn btn-light btn-sm justify-center">
                    <img
                        src="/media/icons/linkedin.svg"
                        className="size-3.5 shrink-0"
                    />
                    <span className="hidden sm:block">Use Linkedin</span>
                </a>
            </div>
        </>
    )
}

export default SignUpHeader;
