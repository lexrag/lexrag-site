import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export type TwoFactorStatus = {
    is_enabled: boolean;
    is_setup: boolean;
};

export type TwoFactorSetupData = {
    opt_url: string;
    recovery_passphrase: string;
};

export type TwoFactorStep = 'status' | 'setup' | 'verify' | 'success' | 'show-qr' | 'reset-required';
export type TwoFactorManageStep = 'main' | 'disable' | 'delete';

export const codeSchema = z.object({
    otp_code: z.string().length(6, 'Code must be 6 digits'),
});
export type CodeFormType = z.infer<typeof codeSchema>;

export interface TwoFactorFlowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export interface TwoFactorVerifyStepProps {
    codeForm: UseFormReturn<CodeFormType>;
    loading: boolean;
    onBack?: () => void;
    onSubmit: (data: CodeFormType) => void;
    backLabel?: string;
    submitLabel?: string;
    showReset?: boolean;
    onReset?: () => void;
}

export interface TwoFactorSetupStepProps {
    setupData: TwoFactorSetupData;
    loading: boolean;
    onNext: () => void;
    onBack?: () => void;
    isBack?: boolean;
    buttonLabel?: string;
}

export interface TwoFactorResetRequiredStepProps {
    loading: boolean;
    onReset: () => void;
    onContinue: () => void;
}

export interface TwoFactorManageStepProps {
    manageStep: TwoFactorManageStep;
    setManageStep: (step: TwoFactorManageStep) => void;
    confirmDisable: boolean;
    setConfirmDisable: (v: boolean) => void;
    confirmDelete: boolean;
    setConfirmDelete: (v: boolean) => void;
    loading: boolean;
    handleDisable2FA: () => void;
    handleDelete2FA: () => void;
    handleClose: () => void;
}
