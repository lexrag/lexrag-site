import Card from "@/components/Layout/Card";
import Input from "@/components/Layout/Input";
import Link from "next/link";

interface EmailFormCardProps {
    email: string;
    setEmail: (email: string) => void;
    onSubmit: () => void;
}

const EmailFormCard = ({email, setEmail, onSubmit}: EmailFormCardProps) => {
    return (
        <Card>
            <div className="flex flex-col gap-5 p-10">

                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Your Email
                    </h3>
                    <span className="text-2sm text-gray-600 font-medium">
                        Enter your email to reset password
                    </span>
                </div>

                <Input label="Email" name="email" placeholder="email@email.com" value={email} onChange={setEmail} />

                <div className="flex flex-col gap-5 items-stretch">
                    <button className="btn btn-primary flex justify-center grow" onClick={onSubmit}>Continue</button>
                    <Link className="flex items-center justify-center text-sm gap-2 text-gray-700 hover:text-primary" href="/auth/signin">
                        <i className="ki-filled ki-black-left"></i>
                        Back to Sign In
                    </Link>
                </div>

            </div>
        </Card>
    )
}

export default EmailFormCard;
