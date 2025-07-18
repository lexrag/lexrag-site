import { useState } from 'react';
import reset2FA from '@/api/user/reset2FA';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

const Reset2FASchema = z.object({
    reset_otp_code: z.string().min(6, 'Enter a valid recovery code'),
});
type Reset2FASchemaType = z.infer<typeof Reset2FASchema>;

interface Reset2FAModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    email: string;
    onBack?: () => void;
}

const Reset2FAModal = ({ open, onOpenChange, email, onBack }: Reset2FAModalProps) => {
    const [isResetProcessing, setIsResetProcessing] = useState(false);
    const [resetError, setResetError] = useState<string | null>(null);

    const reset2FAForm = useForm<Reset2FASchemaType>({
        resolver: zodResolver(Reset2FASchema),
        defaultValues: { reset_otp_code: '' },
    });

    async function onReset2FASubmit(values: Reset2FASchemaType) {
        setIsResetProcessing(true);
        setResetError(null);
        const response = await reset2FA(email.trim(), values.reset_otp_code.trim());
        if (response && !response.error) {
            toast.success('2FA has been reset. You can now log in.');
            reset2FAForm.reset();
            onOpenChange(false);
        } else {
            setResetError(response?.error || 'Failed to reset 2FA. Please check your details.');
        }
        setIsResetProcessing(false);
    }

    return (
        <ReusableDialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) {
                    reset2FAForm.reset();
                    setResetError(null);
                }
            }}
            title=""
            className=" p-4 sm:p-6"
        >
            <div className="flex flex-col items-center gap-2">
                <AlertCircle className="w-14 h-14 text-primary mb-2" />
                <div className="text-lg font-semibold text-primary mb-1 text-center">Reset 2FA</div>
                <div className="text-sm text-secondary-foreground/80 mb-2 text-center max-w-full sm:max-w-xs">
                    Enter your recovery code to reset two-factor authentication for your account.
                </div>
                <Form {...reset2FAForm}>
                    <form
                        onSubmit={reset2FAForm.handleSubmit(onReset2FASubmit)}
                        className="flex flex-col items-center gap-2 w-full"
                        autoComplete="off"
                    >
                        <FormField
                            control={reset2FAForm.control}
                            name="reset_otp_code"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="sr-only">Recovery code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Your recovery code"
                                            autoFocus
                                            autoComplete="one-time-code"
                                            className="w-full text-center tracking-widest text-base py-2 px-3"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {resetError && (
                            <div className="w-full text-xs text-destructive text-center mb-1">{resetError}</div>
                        )}
                        <div className="flex flex-col gap-2 w-full mt-1 sm:flex-row sm:gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full sm:w-1/2"
                                onClick={() => {
                                    if (onBack) onBack();
                                    onOpenChange(false);
                                }}
                                disabled={isResetProcessing}
                            >
                                Back to 2FA
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full sm:w-1/2"
                                disabled={isResetProcessing}
                            >
                                {isResetProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : 'Reset 2FA'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ReusableDialog>
    );
};

export default Reset2FAModal;
