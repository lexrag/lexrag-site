'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

const VALID_CODE = '123456';

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
    loading,
    currentPhoneNumber,
    open,
    onOpenChange,
}: ChangePhoneNumberFlowProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState<string | null>(null);
    const [validatedPhone, setValidatedPhone] = useState<string>('');

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
            setValidatedPhone(data.phone);
            setStep(2);
        } catch {
            setError('Please enter a valid phone number');
        }
    };

    const handleCodeSubmit = async (data: z.infer<typeof codeSchema>) => {
        setError(null);
        if (data.code === VALID_CODE) {
            if (onSuccess) onSuccess(validatedPhone);
            onOpenChange(false);
            handleReset();
        } else {
            setError('Invalid code. Please enter 123456.');
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
                                            <Input {...field} placeholder="e.g. +1234567890" disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <div className="text-destructive text-xs mt-1">{error}</div>}
                            <div className="flex gap-2 mt-4">
                                <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                                    {loading ? 'Processing...' : 'Next'}
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
                                            <Input {...field} placeholder="Enter 123456" disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <div className="text-destructive text-xs mt-1">{error}</div>}
                            <div className="flex gap-2 mt-4">
                                <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>
                                    Back
                                </Button>
                                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                                    {loading ? 'Processing...' : 'Validate'}
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
