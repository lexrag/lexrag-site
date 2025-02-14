import Link from "next/link";
import GoogleAuthButton from "@/components/Auth/GoogleAuth/GoogleAuthButton";

const SignInHeader = () => {
    return (
        <>
            <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                    Sign in
                </h3>
                <div className="flex items-center justify-center font-medium">
                    <span className="text-2sm text-gray-600 me-1.5">Need an account?</span>
                    <Link className="text-2sm link" href="/auth/signup">Sign up</Link>
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

export default SignInHeader;
