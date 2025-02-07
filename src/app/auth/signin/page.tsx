import SignInCard from "@/components/Auth/SignIn/SignInCard";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Sign In',
}

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <SignInCard />
        </div>
    )
}

export default SignInPage;
