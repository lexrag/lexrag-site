import Card from '@/components/Layout/Card';
import PasswordInput from '@/components/Layout/PasswordInput';
import SubmitButton from '@/components/SubmitButton';

interface ResetPasswordFormCardProps {
    handleSubmit: (event: React.SyntheticEvent) => void;
    passwordRef: React.RefObject<HTMLInputElement>;
    secondPasswordRef: React.RefObject<HTMLInputElement>;
    error: string | null;
}

const ResetPasswordFormCard = ({ handleSubmit, passwordRef, secondPasswordRef }: ResetPasswordFormCardProps) => {
    return (
        <Card>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 p-10">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">Reset your password</h3>

                <PasswordInput
                    type="signup"
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    ref={passwordRef}
                />
                <PasswordInput
                    type="signup"
                    label="Confirm Password"
                    name="changepassword"
                    placeholder="Re-enter Password"
                    ref={secondPasswordRef}
                />

                <SubmitButton text="Submit" />
            </form>
        </Card>
    );
};

export default ResetPasswordFormCard;
