import Card from "@/components/Layout/Card";
import SignUpHeader from "@/components/Auth/SignUp/SignUpHeader";
import SignUpForm from "@/components/Auth/SignUp/SignUpForm";

const SignUpCard = () => {
    return (
        <Card>
            <div className="flex flex-col gap-5 md:p-10">
                <SignUpHeader />

                <div className="flex items-center gap-2">
                    <span className="border-t border-gray-200 w-full"></span>
                    <span className="text-2xs text-gray-500 font-medium uppercase">Or</span>
                    <span className="border-t border-gray-200 w-full"></span>
                </div>

                <SignUpForm />
            </div>
        </Card>
    )
}

export default SignUpCard;