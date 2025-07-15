import { useEffect, useState } from 'react';
import { changePassword } from '@/api/auth/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { resetPasswordSchema, type ResetPasswordSchemaType } from '@/app/auth/forms/reset-password-schema';
import InputRow from './InputRow';

type PasswordResetModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
};

const PasswordResetModal = ({ open, onOpenChange, onSuccess }: PasswordResetModalProps) => {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (open) {
            form.reset();
            setSuccess(null);
            setError(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const onSubmit = async (data: ResetPasswordSchemaType) => {
        setSuccess(null);
        setError(null);
        setIsProcessing(true);
        try {
            const response = await changePassword(data.oldPassword, data.newPassword);
            if (!response.success) {
                throw new Error(response.error || 'Failed to reset password');
            }
            setSuccess('Password updated successfully.');
            form.reset();
            if (onSuccess) onSuccess();
            if (onOpenChange) onOpenChange(false);
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full max-w-xs sm:max-w-sm sm:mx-auto"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-mono mb-2">Reset Password</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Change your password by entering your current password and a new one.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <InputRow
                        label="Current Password"
                        id="old-password-modal"
                        value={form.watch('oldPassword') || ''}
                        onChange={(v) => form.setValue('oldPassword', v)}
                        placeholder="Current Password"
                        type="password"
                        className="!px-0"
                    />
                    {form.formState.errors.oldPassword && (
                        <div className="text-xs text-red-500 mb-1">{form.formState.errors.oldPassword.message}</div>
                    )}
                    <InputRow
                        label="New Password"
                        id="new-password-modal"
                        value={form.watch('newPassword') || ''}
                        onChange={(v) => form.setValue('newPassword', v)}
                        placeholder="New Password"
                        type="password"
                        className="!px-0"
                    />
                    {form.formState.errors.newPassword && (
                        <div className="text-xs text-red-500 mb-1">{form.formState.errors.newPassword.message}</div>
                    )}
                    <InputRow
                        label="Confirm Password"
                        id="confirm-password-modal"
                        value={form.watch('confirmPassword') || ''}
                        onChange={(v) => form.setValue('confirmPassword', v)}
                        placeholder="Confirm Password"
                        type="password"
                        className="!px-0"
                    />
                    {form.formState.errors.confirmPassword && (
                        <div className="text-xs text-red-500 mb-1">{form.formState.errors.confirmPassword.message}</div>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        {success && <div className="mb-2 text-green-600 text-sm font-medium">{success}</div>}
                        {error && <div className="mb-2 text-red-600 text-sm font-medium">{error}</div>}
                    </div>
                    <DialogFooter className="flex-row gap-2 justify-end">
                        <Button variant="secondary" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Reset Password'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordResetModal;
