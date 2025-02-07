import SignUpCard from "@/components/Auth/SignUp/SignUpCard";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Sign Up',
}

const SignUpPage = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[100vh] mt-5 mb-5 sm:mt-0 sm:mb-0">
            <SignUpCard />
        </div>
    )
}

export default SignUpPage;
