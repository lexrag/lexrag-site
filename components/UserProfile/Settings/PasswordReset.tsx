'use client';

import { useEffect, useState } from 'react';
import { changePassword } from '@/api/auth/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { resetPasswordSchema, type ResetPasswordSchemaType } from '@/app/auth/forms/reset-password-schema';
import InputRow from '../components/InputRow';

const PasswordReset = () => {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setSuccess(null);
        setError(null);
        form.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

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
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <CardWrapper title="Password Reset">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <InputRow
                    label="Current Password"
                    id="old-password"
                    value={form.watch('oldPassword') || ''}
                    onChange={(v) => form.setValue('oldPassword', v)}
                    placeholder="Current Password"
                    type="password"
                />
                {form.formState.errors.oldPassword && (
                    <div className="text-xs text-red-500 mb-1 ml-4">{form.formState.errors.oldPassword.message}</div>
                )}
                <InputRow
                    label="New Password"
                    id="new-password"
                    value={form.watch('newPassword') || ''}
                    onChange={(v) => form.setValue('newPassword', v)}
                    placeholder="New Password"
                    type="password"
                />
                {form.formState.errors.newPassword && (
                    <div className="text-xs text-red-500 mb-1 ml-4">{form.formState.errors.newPassword.message}</div>
                )}
                <InputRow
                    label="Confirm Password"
                    id="confirm-password"
                    value={form.watch('confirmPassword') || ''}
                    onChange={(v) => form.setValue('confirmPassword', v)}
                    placeholder="Confirm Password"
                    type="password"
                />
                {form.formState.errors.confirmPassword && (
                    <div className="text-xs text-red-500 mb-1 ml-4">
                        {form.formState.errors.confirmPassword.message}
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 w-full ml-4">
                        {success && <div className="mb-2 text-green-600 text-sm font-medium">{success}</div>}
                        {error && <div className="mb-2 text-red-600 text-sm font-medium">{error}</div>}
                    </div>
                    <Button className="py-2 px-4 my-4 mr-4" type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Reset Password'}
                    </Button>
                </div>
            </form>
        </CardWrapper>
    );
};

export default PasswordReset;
