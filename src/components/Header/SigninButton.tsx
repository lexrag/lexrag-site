import Link from "next/link";

const SigninButton = () => {
    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <Link href="/auth/signin" passHref>
                    <span className="btn btn-primary h-[2rem] whitespace-nowrap">
                        Sign In
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default SigninButton;