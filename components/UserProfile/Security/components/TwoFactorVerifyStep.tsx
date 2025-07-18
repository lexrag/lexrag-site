import React from 'react';
import { Shield } from 'lucide-react';
import { TwoFactorVerifyStepProps } from '@/types/TwoFactor';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const TwoFactorVerifyStep: React.FC<TwoFactorVerifyStepProps> = ({
    codeForm,
    loading,
    onBack,
    onSubmit,
    backLabel = 'Back',
    submitLabel = 'Enable 2FA',
    onReset,
}) => (
    <div className="w-full max-w-sm mx-auto">
        <Form {...codeForm}>
            <form
                onSubmit={codeForm.handleSubmit(onSubmit)}
                className="flex flex-col items-center space-y-2"
                autoComplete="off"
            >
                <Shield className="w-14 h-14 text-primary mb-2" />
                <div className="text-lg font-semibold text-primary mb-2 text-center">Enter code</div>
                <div className="text-sm text-secondary-foreground/80 mb-2 text-center max-w-xs">
                    Enter the 6-digit code from your authenticator app
                </div>
                <FormField
                    control={codeForm.control}
                    name="otp_code"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="sr-only">Authenticator code</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="123456"
                                    disabled={loading}
                                    autoFocus
                                    className="w-full text-center tracking-widest text-lg"
                                    inputMode="numeric"
                                    maxLength={6}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 w-full">
                    {onBack && (
                        <Button type="button" variant="outline" className="w-1/2" onClick={onBack} disabled={loading}>
                            {backLabel}
                        </Button>
                    )}
                    <Button type="submit" variant="primary" className={onBack ? 'w-1/2' : 'w-full'} disabled={loading}>
                        {loading ? 'Enabling...' : submitLabel}
                    </Button>
                </div>
                {onReset && (
                    <Button type="button" variant="destructive" className="w-full" onClick={onReset} disabled={loading}>
                        Reset 2FA Setup
                    </Button>
                )}
            </form>
        </Form>
    </div>
);

export default TwoFactorVerifyStep;
