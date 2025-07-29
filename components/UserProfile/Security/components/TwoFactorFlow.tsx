import { useEffect, useState } from 'react';
import { delete2FA } from '@/api/user/delete2FA';
import { disableTwoFactor } from '@/api/user/disableTwoFactor';
import { enable2FA } from '@/api/user/enable2FA';
import { get2FAStatus } from '@/api/user/get2FAStatus';
import { setTwoFactor } from '@/api/user/set2FA';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { TwoFactorManageStep, TwoFactorSetupData, TwoFactorStatus, TwoFactorStep } from '@/types/TwoFactor';
import { Button } from '@/components/ui/button';
import ReusableDialog from '@/components/common/ReusableDialog';
import TwoFactorLoadingBlock from './TwoFactorLoadingBlock';
import TwoFactorManageStepComponent from './TwoFactorManageStep';
import TwoFactorResetRequiredStep from './TwoFactorResetRequiredStep';
import TwoFactorSetupStep from './TwoFactorSetupStep';
import TwoFactorVerifyStep from './TwoFactorVerifyStep';

interface TwoFactorFlowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

const codeSchema = z.object({
    otp_code: z.string().length(6, 'Code must be 6 digits'),
});
export default function TwoFactorFlow({ open, onOpenChange, onSuccess }: TwoFactorFlowProps) {
    const [step, setStep] = useState<TwoFactorStep>('status');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<TwoFactorStatus | null>(null);
    const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [manageStep, setManageStep] = useState<TwoFactorManageStep>('main');
    const [confirmDisable, setConfirmDisable] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const codeForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: { otp_code: '' },
    });

    useEffect(() => {
        if (open) {
            fetchStatus();
            setStep('status');
            setSetupData(null);
            setError(null);
            codeForm.reset();
        }
        // eslint-disable-next-line
    }, [open]);

    useEffect(() => {
        if (status?.is_setup && !status?.is_enabled && !setupData) {
            setStep('reset-required');
        }
    }, [status, setupData]);

    const fetchStatus = async () => {
        setLoading(true);
        const res = await get2FAStatus();
        setLoading(false);
        if (res.success) {
            setStatus({
                is_enabled: res.data.is_enabled,
                is_setup: res.data.is_setup,
            });
            setError(null);
        } else {
            setStatus({ is_enabled: false, is_setup: false });
            setError(res.error || 'Failed to get 2FA status');
        }
    };

    const handleStartSetup = async () => {
        setLoading(true);
        setError(null);
        const res = await setTwoFactor();
        setLoading(false);
        if (res.success && res.data.otp_url && res.data.recovery_passphrase) {
            setSetupData({ opt_url: res.data.otp_url, recovery_passphrase: res.data.recovery_passphrase });
            setStep('setup');
        } else {
            setError(res.error || 'Failed to start 2FA setup');
        }
    };

    const handleVerify = async (data: z.infer<typeof codeSchema>) => {
        setLoading(true);
        setError(null);
        const res = await enable2FA(data.otp_code);
        setLoading(false);
        if (res.success) {
            if (onSuccess) onSuccess();
            toast.success('Two-factor authentication enabled!');
            handleClose();
        } else {
            setError(res.error || 'Invalid code.');
        }
    };

    const handleDisable2FA = async () => {
        setLoading(true);
        setError(null);
        const res = await disableTwoFactor();
        setLoading(false);
        if (res.success) {
            toast.success('Two-factor authentication disabled!');
            setManageStep('main');
            setConfirmDisable(false);
            fetchStatus();
            handleClose();
        } else {
            setError(res.error || 'Failed to disable 2FA');
        }
    };
    const handleDelete2FA = async () => {
        setLoading(true);
        setError(null);
        const delRes = await delete2FA();
        if (!delRes.success) {
            setLoading(false);
            setError(delRes.error || 'Failed to reset 2FA setup');
            return;
        }
    };

    const handleReset2FASetup = async () => {
        setLoading(true);
        setError(null);
        const delRes = await delete2FA();
        if (!delRes.success) {
            setLoading(false);
            setError(delRes.error || 'Failed to reset 2FA setup');
            return;
        }
        const setRes = await setTwoFactor();
        setLoading(false);
        if (setRes.success && setRes.data.otp_url && setRes.data.recovery_passphrase) {
            setSetupData({ opt_url: setRes.data.otp_url, recovery_passphrase: setRes.data.recovery_passphrase });
            setStep('setup');
            fetchStatus();
        } else {
            setError(setRes.error || 'Failed to start new 2FA setup');
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setStep('status');
            setSetupData(null);
            setError(null);
            codeForm.reset();
        }, 300);
    };

    return (
        <>
            <ReusableDialog open={open} onOpenChange={handleClose} headerClassName="mb-0 pb-0">
                <div className="space-y-4 max-w-sm mx-auto">
                    {loading && <TwoFactorLoadingBlock />}
                    {error && !loading && (
                        <div className="flex flex-col gap-4 items-center py-8">
                            <XCircle className="w-12 h-12 text-destructive mb-2" />
                            <div className="text-destructive text-lg font-semibold">{error}</div>
                            <Button variant="outline" className="w-full" onClick={fetchStatus}>
                                Retry
                            </Button>
                        </div>
                    )}
                    {!loading && !error && status && (
                        <>
                            {status.is_setup === false && status.is_enabled === false && (
                                <>
                                    {step === 'status' && (
                                        <div className="flex flex-col gap-6 items-center pt-12">
                                            <Shield className="w-14 h-14 text-primary mb-2" />
                                            <div className="text-warning font-semibold text-xl">2FA is not enabled</div>
                                            <p className="text-muted-foreground text-center max-w-xs mb-2">
                                                Protect your account by enabling two-factor authentication.
                                            </p>
                                            <Button
                                                variant="primary"
                                                className="w-full"
                                                onClick={handleStartSetup}
                                                disabled={loading}
                                            >
                                                {loading ? 'Loading...' : 'Set up 2FA'}
                                            </Button>
                                        </div>
                                    )}
                                    {step === 'setup' && setupData && (
                                        <TwoFactorSetupStep
                                            setupData={setupData}
                                            loading={loading}
                                            onNext={() => setStep('verify')}
                                            buttonLabel="Next"
                                        />
                                    )}
                                    {step === 'verify' && (
                                        <TwoFactorVerifyStep
                                            codeForm={codeForm}
                                            loading={loading}
                                            onBack={() => setStep('setup')}
                                            onSubmit={handleVerify}
                                            backLabel="Back"
                                            submitLabel="Enable 2FA"
                                        />
                                    )}
                                </>
                            )}
                            {status.is_setup === true && status.is_enabled === false && (
                                <>
                                    {step === 'reset-required' && (
                                        <TwoFactorResetRequiredStep
                                            loading={loading}
                                            onReset={handleReset2FASetup}
                                            onContinue={() => setStep('verify')}
                                        />
                                    )}
                                    {step === 'setup' && setupData && (
                                        <TwoFactorSetupStep
                                            setupData={setupData}
                                            loading={loading}
                                            onNext={() => setStep('verify')}
                                            onBack={handleClose}
                                            isBack={true}
                                            buttonLabel="Continue"
                                        />
                                    )}
                                    {step === 'verify' && (
                                        <TwoFactorVerifyStep
                                            codeForm={codeForm}
                                            loading={loading}
                                            onBack={handleClose}
                                            onSubmit={handleVerify}
                                            backLabel="Cancel"
                                            submitLabel="Enable 2FA"
                                            showReset={true}
                                            onReset={handleReset2FASetup}
                                        />
                                    )}
                                </>
                            )}
                            {status.is_enabled === true && (
                                <TwoFactorManageStepComponent
                                    manageStep={manageStep}
                                    setManageStep={setManageStep}
                                    confirmDisable={confirmDisable}
                                    setConfirmDisable={setConfirmDisable}
                                    confirmDelete={confirmDelete}
                                    setConfirmDelete={setConfirmDelete}
                                    loading={loading}
                                    handleDisable2FA={handleDisable2FA}
                                    handleDelete2FA={handleDelete2FA}
                                    handleClose={handleClose}
                                />
                            )}
                        </>
                    )}
                </div>
            </ReusableDialog>
        </>
    );
}
