import Card from "@/components/Layout/Card";
import SignInHeader from "@/components/Auth/SignIn/SignInHeader";
import SignInForm from "@/components/Auth/SignIn/SignInForm";

const SignInCard = () => {


    return (
        <Card>
            <div className="flex flex-col gap-5 md:p-10">
                <SignInHeader />

                <div className="flex items-center gap-2">
                    <span className="border-t border-gray-200 w-full"></span>
                    <span className="text-2xs text-gray-500 font-medium uppercase">Or</span>
                    <span className="border-t border-gray-200 w-full"></span>
                </div>

                <SignInForm />
            </div>
        </Card>
    )
}

export default SignInCard;