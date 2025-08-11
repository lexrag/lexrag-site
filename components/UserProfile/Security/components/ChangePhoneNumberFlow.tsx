'use client';

import { useState } from 'react';
import { getPhoneNumberCode } from '@/api/user/getPhoneNumberCode';
import { verifyPhoneNumber } from '@/api/user/verifyPhoneNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

interface ChangePhoneNumberFlowProps {
    onSuccess?: (phone: string) => void;
    loading: boolean;
    currentPhoneNumber: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const phoneSchema = z.object({
    phone: z.string().min(1, 'Phone number is required').max(15, 'Phone number is too long'),
});
const codeSchema = z.object({
    code: z.string().length(6, 'Code must be 6 digits'),
});

const ChangePhoneNumberFlow = ({
    onSuccess,
    loading: parentLoading,
    currentPhoneNumber,
    open,
    onOpenChange,
}: ChangePhoneNumberFlowProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState<string | null>(null);
    const [validatedPhone, setValidatedPhone] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const phoneForm = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phone: currentPhoneNumber },
    });

    const codeForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: { code: '' },
    });

    const handlePhoneSubmit = async (data: z.infer<typeof phoneSchema>) => {
        setError(null);
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsedNumber = phoneUtil.parse(data.phone);
            if (!phoneUtil.isValidNumber(parsedNumber)) {
                setError('Please enter a valid phone number');
                return;
            }
            setLoading(true);
            const res = await getPhoneNumberCode(data.phone);
            setLoading(false);
            if (res.success) {
                setValidatedPhone(data.phone);
                setStep(2);
            } else {
                setError(res.error || 'Failed to send verification code');
            }
        } catch {
            setError('Please enter a valid phone number');
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (data: z.infer<typeof codeSchema>) => {
        setError(null);
        setLoading(true);
        const res = await verifyPhoneNumber(validatedPhone, data.code);
        setLoading(false);
        if (res.success) {
            if (onSuccess) onSuccess(validatedPhone);
            onOpenChange(false);
            handleReset();
        } else {
            setError(res.error || 'Invalid code.');
        }
    };

    const handleReset = () => {
        setStep(1);
        setError(null);
        setValidatedPhone('');
        phoneForm.reset({ phone: currentPhoneNumber });
        codeForm.reset({ code: '' });
    };

    const handleCancel = () => {
        handleReset();
        onOpenChange(false);
    };

    return (
        <ReusableDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Change Phone Number"
            headerClassName="mb-0"
            footer={null}
        >
            <div className="space-y-3 max-w-sm mx-auto py-4">
                {step === 1 && (
                    <Form {...phoneForm}>
                        <form
                            onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
                            className="space-y-3"
                            autoComplete="off"
                        >
                            <FormField
                                control={phoneForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g. +1234567890"
                                                disabled={loading || parentLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <div className="text-destructive text-xs mt-1">{error}</div>}
                            <div className="flex gap-2 mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleCancel}
                                    disabled={loading || parentLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={loading || parentLoading}
                                >
                                    {loading || parentLoading ? 'Processing...' : 'Next'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
                {step === 2 && (
                    <Form {...codeForm}>
                        <form
                            onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
                            className="space-y-3"
                            autoComplete="off"
                        >
                            <FormField
                                control={codeForm.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter code"
                                                disabled={loading || parentLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <div className="text-destructive text-xs mt-1">{error}</div>}
                            <div className="flex gap-2 mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleCancel}
                                    disabled={loading || parentLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={loading || parentLoading}
                                >
                                    {loading || parentLoading ? 'Processing...' : 'Validate'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </ReusableDialog>
    );
};

export default ChangePhoneNumberFlow;
